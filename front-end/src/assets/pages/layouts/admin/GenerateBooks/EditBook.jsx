import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const titleRef = useRef('');
  const descriptionRef = useRef('');
  const formatRef = useRef('');
  const publishedRef = useRef('');
  const ISBNRef = useRef('');
  const categorieRef = useRef('');
  const authorRef = useRef('');
  const languageRef = useRef('');
  const photoRef = useRef('');
  const priceRef = useRef('');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/books/${id}`)
      .then(response => {
        const book = response.data;
        titleRef.current.value = book.title;
        descriptionRef.current.value = book.description;
        formatRef.current.value = book.format;
        publishedRef.current.value = book.published;
        ISBNRef.current.value = book.ISBN;
        categorieRef.current.value = book.categorie;
        authorRef.current.value = book.author;
        languageRef.current.value = book.language;
        photoRef.current.value = book.photo;
        priceRef.current.value = book.price;
      })
      .catch(error => {
        console.error("There was an error fetching the book!", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      format: formatRef.current.value,
      published: publishedRef.current.value,
      ISBN: ISBNRef.current.value,
      categorie: categorieRef.current.value,
      author: authorRef.current.value,
      language: languageRef.current.value,
      photo: photoRef.current.value,
      price: priceRef.current.value
    };

    axios.put(`http://localhost:8000/api/books/${id}`, payload)
      .then(response => {
        swal("Success", "Book edited successfully!", "success")
          .then(() => {
            navigate('/admin/books');
          });
      })
      .catch(err => {
        console.error("There was an error editing the book!", err);
        swal("Error", "There was an error editing the book.", "error");
      });
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-10">
        <h2 className="text-2xl font-semibold text-center mb-6">Edit Book</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center">
            <label className="w-1/3 text-sm font-medium text-black">Title:</label>
            <input
              type="text"
              placeholder="title"
              ref={titleRef}
              className="mt-1 w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-sm font-medium text-black">Description:</label>
            <textarea
              ref={descriptionRef}
              placeholder="description"
              className="mt-1 w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-sm font-medium text-black">Format:</label>
            <input
              type="text"
              placeholder="format"
              ref={formatRef}
              className="mt-1 w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-sm font-medium text-black">Published:</label>
            <input
              type="text"
              placeholder="pub"
              ref={publishedRef}
              className="mt-1 w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-sm font-medium text-black">ISBN:</label>
            <input
              type="text"
              placeholder="isbn"
              ref={ISBNRef}
              className="mt-1 w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-sm font-medium text-black">Category:</label>
            <input
              type="text"
              placeholder="category"
              ref={categorieRef}
              className="mt-1 w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-sm font-medium text-black">Author:</label>
            <input
              type="text"
              placeholder="author"
              ref={authorRef}
              className="mt-1 w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-sm font-medium text-black">Language:</label>
            <input
              type="text"
              placeholder="language"
              ref={languageRef}
              className="mt-1 w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-sm font-medium text-black">Photo URL:</label>
            <input
              type="url"
              placeholder="picture"
              ref={photoRef}
              className="mt-1 w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-sm font-medium text-black">Price:</label>
            <input
              type="text"
              placeholder="price"
              ref={priceRef}
              className="mt-1 w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">Edit Book</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditBook;
