import { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const { token } = useStateContext();
  const [checkoutInput, setCheckoutInput] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();

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
        console.error("Error fetching cart:", err);
        swal('Oops!', 'Something went wrong', 'error');
      }
    };

    fetchCart();
  }, [token]);

  const handleInput = (e) => {
    e.persist();
    setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    const data = {
      firstname: checkoutInput.firstname,
      lastname: checkoutInput.lastname,
      phone: checkoutInput.phone,
      email: checkoutInput.email,
      address: checkoutInput.address,
      city: checkoutInput.city,
      state: checkoutInput.state,
      zipcode: checkoutInput.zipcode,
    };
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/place-order', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      console.log(response.data); 
  
      if (response.data.status === 200) {
        setError({});
        swal('Order Placed Successfully', response.data.message, 'success');
        navigate('/reader/thankyou');
      } else if (response.data.status === 422) {
        swal('All fields are mandatory', '', 'warning');
        setError(response.data.message);
      } else {
        swal('Oops!', 'Something went wrong', 'error');
      }
    } catch (err) {
      console.error("Error placing order:", err);
      swal('Oops!', 'Something went wrong', 'error');
    }
  };

  const calculateGrandTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.book.price * item.book_qty);
    }, 0);
  };

  return (
    <div className="container mx-auto p-32 flex bg-gray-100">
      <div className="w-1/2 pr-4">
        <h2 className="text-3xl mb-4">Billing Information</h2>

        <form className="space-y-4">
  {['firstname', 'lastname', 'phone', 'email', 'address', 'city', 'state', 'zipcode'].map((field) => (
    <div className="flex items-center" key={field}>
      <label className="w-1/3" htmlFor={field}>
        {field.charAt(0).toUpperCase() + field.slice(1)}:
      </label>
      <input
        type="text"
        id={field}
        onChange={handleInput}
        value={checkoutInput[field]}
        name={field}
        className="w-2/3 px-6 py-4 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
      {error[field] && <small className="text-red-500">{error[field]}</small>}
    </div>
  ))}
  <button onClick={(e)=>submitOrder(e,'cod')} type="submit" className="bg-blue-900 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
    Place Order
  </button>
</form>

      </div>
      <div className="w-1/2 pl-4">
        <h2 className="text-3xl  mb-4">Order Summary</h2>
        <div className="max-w-md mx-auto">
  <table className="w-full border-collapse border border-gray-300">
    <thead className="bg-gray-200">
      <tr>
        <th className="border border-gray-300 px-4 py-2">Book</th>
        <th className="border border-gray-300 px-4 py-2">Price</th>
        <th className="border border-gray-300 px-4 py-2">Quantity</th>
        <th className="border border-gray-300 px-4 py-2">Total Price</th>
      </tr>
    </thead>
    <tbody>
      {cart.map((item, index) => (
        <tr key={index}>
          <td className="border border-gray-300 px-4 py-2">{item.book.title}</td>
          <td className="border border-gray-300 px-4 py-2">{item.book.price} MAD</td>
          <td className="border border-gray-300 px-4 py-2">{item.book_qty}</td>
          <td className="border border-gray-300 px-4 py-2">{item.book.price * item.book_qty} MAD</td>
        </tr>
      ))}
      <tr>
        <td colSpan="3" className="border border-gray-300 px-4 py-2 text-right">Grand Total</td>
        <td className="border border-gray-300 px-4 py-2">{calculateGrandTotal()} MAD</td>
      </tr>
    </tbody>
  </table>
</div>

      </div>
    </div>
  );
}
