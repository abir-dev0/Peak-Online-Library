import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import axios from "axios";

export default function ListBooks() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/books')
            .then((response) => response.json())
            .then((data) => {
                setBooks(data);
            })
            .catch((err) => console.log("Error:", err));
    }, []);

    useEffect(() => {
        console.log(books);
    }, [books]);

    const handleDelete = (e, bookId) => {
        e.preventDefault();
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this book!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://127.0.0.1:8000/api/books/${bookId}`)
                    .then(response => {
                        swal("Poof! Your book has been deleted!", {
                            icon: "success",
                        });
                        setBooks(books.filter(book => book.id !== bookId));
                    })
                    .catch(error => {
                        console.error("There was an error deleting the book!", error);
                        swal("Oops! Something went wrong. Please try again.", {
                            icon: "error",
                        });
                    });
            } else {
                swal("Your book is safe!");
            }
        });
    };
    if (!books) {
        return <div className="text-center py-16">Loading...</div>;
      }

    return (
        <div className="container mx-auto p-8 bg-white shadow-md rounded-lg">
            <div className="mb-6 flex justify-end">
                <Link to='/admin/create-book' className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                    New Book
                </Link>
            </div>
            <div className="flex justify-center items-center p-16 ">
                <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-6">
                    <h2 className="text-2xl font-semibold text-center mb-6">Your books</h2>
                    <div className="overflow-x-auto">
                    <table className=" border-collapse">
                        <thead>
                        <tr>
                            <th className="border-b-2 py-3 px-4 text-left">Title</th>
                            <th className="border-b-2 py-3 px-4 text-left">Format</th>
                            <th className="border-b-2 py-3 px-4 text-left">Published</th>
                            <th className="border-b-2 py-3 px-4 text-left">ISBN</th>
                            <th className="border-b-2 py-3 px-4 text-left">Photo</th>
                            <th className="border-b-2 py-3 px-4 text-left">Price</th>
                            <th className="border-b-2 py-3 px-4 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {books.map((book, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-3 px-4">{book.title}</td>
                                <td className="py-3 px-4">{book.format}</td>
                                <td className="py-3 px-4">{book.published}</td>
                                <td className="py-3 px-4">{book.ISBN}</td>
                                <td className="py-3 px-4">
                                    <img src={book.photo} alt={book.title} className="h-16 w-16 object-cover" />
                                </td>
                                <td className="py-3 px-4">{book.price} MAD</td>
                                <td className="py-3 px-4 flex">
                                    <button
                                        type="button"
                                        onClick={(e) => handleDelete(e, book.id)}
                                        className="px-2 py-1 bg-red-700 text-white rounded mr-2"
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        to={`/admin/edit-book/${book.id}`}
                                        className="px-2 py-1 bg-yellow-400 text-white rounded"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    );
}
