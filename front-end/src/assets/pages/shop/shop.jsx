import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useStateContext } from "../../../contexts/ContextProvider";

export default function Shop() {
  const [books, setBooks] = useState([]);
  const { token } = useStateContext();
  const [searchInput, setSearchInput] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/books')
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data); // Initialize filteredBooks with all books
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  useEffect(() => {
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchInput.toLowerCase()));
    setFilteredBooks(filtered);
  }, [searchInput, books]);

  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl tracking-tight text-gray-900">Our Books</h2>
        <div className="mt-4">
          <input
            type="text"
            className="mt-1  h-12 px-3 py-2 border border-gray-300 rounded-2xl ring-1 ring-inset ring-gray-400 focus:text-gray-800"
            placeholder="Search for books..."
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredBooks.map((book) => (
            <div key={book.id} className="group relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={book.photo}
                  alt={book.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="p-4 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    <Link to={token ? `/reader/shop/${book.id}` : `/shop/${book.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {book.title}
                    </Link>
                  </h3>
                </div>
                <p className="mt-1 text-sm font-semibold text-gray-500">{book.price} MAD</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
