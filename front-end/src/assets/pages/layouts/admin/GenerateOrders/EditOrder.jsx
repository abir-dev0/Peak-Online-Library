import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const firstnameRef = useRef('');
  const lastnameRed = useRef('');
  const phoneRef = useRef('');
  const emailRef = useRef('');
  const addressRef = useRef('');
  const cityRef = useRef('');
  const stateRef = useRef('');
  const zipcodeRef = useRef('');
  const statusRef = useRef('');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/order/${id}`)
      .then(response => {
        const order = response.data;
        firstnameRef.current.value = order.firstname;
        lastnameRed.current.value = order.lastname;
        phoneRef.current.value = order.phone;
        emailRef.current.value = order.email;
        addressRef.current.value = order.address;
        cityRef.current.value = order.city;
        stateRef.current.value = order.state;
        zipcodeRef.current.value = order.zipcode;
        statusRef.current.value = order.status;
      })
      .catch(error => {
        console.error("There was an error fetching the order!", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
    firstname: firstnameRef.current.value,
    lastname: lastnameRed.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      zipcode: zipcodeRef.current.value,
      status: statusRef.current.value,
    };

    axios.put(`http://localhost:8000/api/edit-order/${id}`, payload)
      .then(response => {
        swal("Success", "Order edited successfully!", "success")
          .then(() => {
            navigate('/admin/orders');
          });
      })
      .catch(err => {
        console.error("There was an error editing the order!", err);
        swal("Error", "There was an error editing the order.", "error");
      });
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-10">
        <h2 className="text-2xl font-semibold text-center mb-6">Edit Order</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center">
            <label className="w-1/3 text-sm font-medium text-black">First Name:</label>
            <input
              type="text"
              placeholder="firstname"
              ref={firstnameRef}
              className="mt-1 w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-sm font-medium text-black">Last Name:</label>
            <textarea
              ref={lastnameRed}
              placeholder="lastname"
              className="mt-1 w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-sm font-medium text-black">Phone:</label>
            <input
              type="text"
              placeholder="phone"
              ref={phoneRef}
              className="mt-1 w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-sm font-medium text-black">Email:</label>
            <input
              type="text"
              placeholder="email"
              ref={emailRef}
              className="mt-1 w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-sm font-medium text-black">Address:</label>
            <input
              type="text"
              placeholder="address"
              ref={addressRef}
              className="mt-1 w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-sm font-medium text-black">City:</label>
            <input
              type="text"
              placeholder="city"
              ref={cityRef}
              className="mt-1 w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-sm font-medium text-black">State:</label>
            <input
              type="text"
              placeholder="state"
              ref={stateRef}
              className="mt-1 w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-sm font-medium text-black">ZipCode:</label>
            <input
              type="text"
              placeholder="zipcode"
              ref={zipcodeRef}
              className="mt-1 w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-sm font-medium text-black">Status:</label>
            <input
              type="text"
              placeholder="status"
              ref={statusRef}
              className="mt-1 w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>


          <div className="flex justify-center">
            <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">Edit Order</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditOrder;
