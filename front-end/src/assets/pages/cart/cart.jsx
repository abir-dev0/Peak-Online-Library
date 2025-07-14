import { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Link } from "react-router-dom";
export default function Cart() {
  const [cart, setCart] = useState([]);
  const { token } = useStateContext();

  // get the cart list  
  useEffect(() => {
    const fetchCart = async () => {
      if (!token) {
        swal('Oops!', 'Login to view your cart page', 'warning');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/carts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.status === 200) {
          setCart(response.data.cart);
        } else if (response.data.status === 401) {
          swal('Oops!', response.data.message, 'warning');
        }
      } catch (err) {
        console.error("Error:", err);
        swal('Oops!', 'Something went wrong', 'error');
      }
    };

    fetchCart();
  }, [token]);

  // handle decrement and increment quantity

  const handleDecrement = async (cart_id) => {
    setCart(cart =>
      cart.map(item =>
        cart_id === item.id ? { ...item, book_qty: item.book_qty - (item.book_qty > 1 ? 1 : 0) } : item
      )
    );
    await updateQuantity(cart_id, 'dec');
  };

  const handleIncrement = async (cart_id) => {
    setCart(cart =>
      cart.map(item =>
        cart_id === item.id ? { ...item, book_qty: item.book_qty + (item.book_qty < 20 ? 1 : 0) } : item
      )
    );
    await updateQuantity(cart_id, 'inc');
  };

  // update quantity in the database

  const updateQuantity = async (cart_id, scope) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/update-quantity/${cart_id}/${scope}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.status !== 200) {
        swal('Oops!', response.data.message, 'warning');
      }
    } catch (err) {
      console.error("Error:", err);
      swal('Oops!', 'Something went wrong', 'error');
    }
  };

  // handle remove 

  const handleRemove = async (e, cart_id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = 'Removing...';
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/delete-cartitem/${cart_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.status === 200) {
        swal('Success', response.data.message, 'success');
        thisClicked.closest('tr').remove();
      } else if (response.data.status === 404) {
        swal('Oops!', response.data.message, 'error');
        thisClicked.innerText = 'Remove'; // Fix this line, was calling `remove()` method incorrectly
      }
    } catch (err) {
      console.error("Error:", err);
      swal('Oops!', 'Something went wrong', 'error');
      thisClicked.innerText = 'Remove';
    }
  };

  const calculateGrandTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.book.price * item.book_qty);
    }, 0);
  };

  return (
    <div className="flex justify-center items-center p-32 ">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Shopping Cart</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 py-3 px-4 text-left">Image</th>
                <th className="border-b-2 py-3 px-4 text-left">Book</th>
                <th className="border-b-2 py-3 px-4 text-left">Price</th>
                <th className="border-b-2 py-3 px-4 text-left">Quantity</th>
                <th className="border-b-2 py-3 px-4 text-left">Total Price</th>
                <th className="border-b-2 py-3 px-4 text-left">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4">
                      <img src={item.book.photo} alt={item.title} className="h-16 w-16 object-cover" />
                    </td>
                    <td className="py-3 px-4">{item.book.title}</td>
                    <td className="py-3 px-4">{item.book.price} MAD</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <button
                          className="px-2 py-1 bg-gray-200 rounded-l"
                          onClick={() => handleDecrement(item.id)}
                        >
                          -
                        </button>
                        <span className="px-3">{item.book_qty}</span>
                        <button
                          className="px-2 py-1 bg-gray-200 rounded-r"
                          onClick={() => handleIncrement(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4">{item.book.price * item.book_qty} MAD</td>
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        className="px-2 py-1 bg-red-600 text-white rounded"
                        onClick={(e) => handleRemove(e, item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6">
                    Your cart is empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <h3 className="text-xl ">Grand Total: {calculateGrandTotal()} MAD</h3>
          <Link to='/reader/checkout' className="bg-green-700 hover:bg-green-900 text-white  py-2 px-2 rounded">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
