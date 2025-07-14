import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { useStateContext } from '../../../contexts/ContextProvider';

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user, token } = useStateContext();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/books/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((err) => console.log("Error:", err));
  }, [id]);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevCount => prevCount - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < 20) {
      setQuantity(prevCount => prevCount + 1);
    }
  };

  const addtocart = (e) => {
    e.preventDefault();
    const data = {
      user_id: user.id,
      book_id: id,
      book_qty: quantity,
    };

    axios.post('http://localhost:8000/api/add-to-cart', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response.data);
      if (response.data.status === 201) {
        swal('Success', response.data.message, 'success');
      } else if (response.data.status === 409) {
        swal('Oops!', response.data.message, 'warning');
      } else if (response.data.status === 401) {
        swal('Oops!', response.data.message, 'error');
      }
    })
    .catch(err => {
      console.log(err);
      swal('Oops!', 'Something went wrong', 'error');
    });
  };

  if (!book) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="lg:flex lg:items-start lg:space-x-8">
          <div className="lg:w-1/3">
            <img
              src={book.photo}
              alt={book.title}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="mt-10 lg:mt-0 lg:w-2/3">
            <h1 className="text-4xl  tracking-tight text-gray-900">{book.title}</h1>
            <p className="text-3xl  mt-4">{book.price} MAD</p>
            <p className="mt-4 text-gray-700 leading-relaxed">{book.description}</p>
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Writer :</h3>
              <div className="text-gray-700">{book.author}</div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Category :</h3>
              <div className="text-gray-700">{book.categorie}</div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Language :</h3>
              <div className="text-gray-700">{book.language}</div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Published :</h3>
              <div className="text-gray-700">{book.published}</div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Format :</h3>
              <div className="text-gray-700">{book.format}</div>
            </div>
            <div className="mt-6 flex items-center space-x-4">
              <button 
                className="px-3 py-2 bg-black text-white rounded-l "
                onClick={handleDecrement}
              >
                -
              </button>
              <span className="px-4 py-2 border-t border-b border-gray-200 bg-gray-100 text-gray-700">{quantity}</span>
              <button 
                className="px-3 py-2 bg-black text-white rounded-r "
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
            <div className="mt-6">
              <button 
                className="w-full py-3 px-4 bg-black text-white  rounded hover:bg-gray-900"
                onClick={addtocart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
