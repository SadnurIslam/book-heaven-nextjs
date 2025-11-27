"use client";

import React, { use, useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import { FaPlus } from 'react-icons/fa';
import UpdateModal from '../components/UpdateModal';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiEye } from 'react-icons/fi';
import Swal from 'sweetalert2';
import Link from 'next/link';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { AuthContext } from '../contexts/AuthContext';

const MyBooks = () => {
    const {user, loading} = use(AuthContext);
    const [books, setBooks] = useState([]);
    const [loadingLocal, setLoadingLocal] = useState(true);
    const [selectedBook, setSelectedBook] = useState(null);
    const modalRef = useRef(null);

    

    useEffect(() => {
        axios
          .get(`https://book-heaven-server-jade.vercel.app/books?email=${user?.email}`)
          .then((response) => setBooks(response.data))
          .catch((error) => console.error('Error fetching user books:', error))
          .finally(() => setLoadingLocal(false));
    }, [user?.email]);


    if(loading){
        return <div className='flex justify-center items-center min-h-screen'>
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        </div>;
    }

    if(!user){
        redirect('/login');
    }


    const handleBookDelete = async (bookId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://book-heaven-server-jade.vercel.app/books/${bookId}`)
                    .then(() => {
                        setBooks(books.filter(book => book._id !== bookId));
                        Swal.fire(
                            "Deleted!",
                            "Your book has been deleted.",
                            "success"
                        );
                    })
                    .catch((error) => {
                        Swal.fire(
                            "Error!",
                            "There was an error deleting the book: " + error.message,
                            "error"
                        );
                    });
            }
        });
    };

    const openUpdateModal = (book) => {
        setSelectedBook(book);
        modalRef.current.showModal();
    };

    const closeUpdateModal = () => {
        modalRef.current.close();
    };



    return (
        <section className="my-12 max-w-7xl mx-auto px-0 md:px-4">
            <div className="text-center mb-7">
                <h2 className="text-3xl md:text-4xl font-extrabold text-primary">My Books</h2>
                <p className="text-secondary opacity-80 mt-2 text-sm md:text-base">
                    You have {books.length} books in your collection.
                </p>
            </div>

            <div className="flex justify-end mb-5">
                <Link href="/add-book" className="btn btn-primary rounded-lg px-5 font-semibold flex items-center gap-2">
                    <FaPlus /> Add Book
                </Link>
            </div>

            <div className="overflow-x-auto rounded-xl shadow-md border border-base-300">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200 text-base font-semibold">
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th className='hidden md:flex'>Genre</th>
                            <th>Rating</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
              loadingLocal ?
                <tr>
                  <td colSpan="5" className="text-center py-6">
                    <span className="loading loading-spinner loading-lg"></span>
                  </td>
                </tr>

                : (
                  books.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-6 text-secondary">
                        No books available at the moment.
                      </td>
                    </tr>
                  )
                    :
                    books.map((book) => (
                      <tr key={book._id} className="hover:bg-base-300/40 transition-all">
                        <td className="font-semibold">{book.title}</td>
                        <td>{book.author}</td>
                        <td className='hidden md:flex'>{book.genre}</td>
                        <td>
                          <div className="flex items-center gap-2 justify-center lg:justify-start">
                            <div className='hidden lg:flex items-center gap-1'>
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  fill={i < book.rating ? 'currentColor' : 'none'}
                                  className="text-yellow-400"
                                />
                              ))}
                            </div>
                            <span className="text-sm text-secondary"><span className='hidden lg:inline'>(</span>{book.rating}<span className='hidden lg:inline'>)</span></span>
                          </div>
                        </td>
                        <td className="text-center flex justify-center gap-2">
                          <Link href={`/books/${book._id}`} className="btn btn-info btn-sm text-white rounded-lg">
                            <span className='md:hidden'><FiEye /></span>
                            <span className='hidden md:flex'>View</span>
                          </Link>
                          <button
                            onClick={() => openUpdateModal(book)}
                            className="btn btn-warning btn-sm text-white rounded-lg"
                          >
                            <span className='md:hidden'><MdEdit /></span>
                            <span className='hidden md:flex'>Update</span>
                          </button>
                          <button onClick={() => handleBookDelete(book._id)} className="btn btn-error btn-sm text-white rounded-lg">
                            <span className='md:hidden'><RiDeleteBinLine /></span>
                            <span className='hidden md:flex'>Delete</span>
                          </button>
                        </td>
                      </tr>
                    )))
            }
            
                    </tbody>
                </table>
            </div>

            {/* Update Modal */}
            <dialog ref={modalRef} className="modal">
                <div className="modal-box w-11/12 max-w-5xl p-0">
                    {selectedBook && (
                        <UpdateModal
                            key={selectedBook._id}
                            book={selectedBook}
                            closeUpdateModal={closeUpdateModal}
                            setBooks={setBooks}
                            books={books}
                        />
                    )}
                </div>
            </dialog>
        </section>
    );
};

export default MyBooks;
