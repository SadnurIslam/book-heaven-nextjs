"use client";

import React, { use, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../contexts/AuthContext';
import { redirect } from 'next/navigation';
import axios from 'axios';

const AddBooks = () => {
    const { user, loading } = use(AuthContext);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = "Add Book | The Book Heaven";
    }, []);

    if (loading) {
        return <div className='flex justify-center items-center min-h-screen'>
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        </div>;
    }

    if (!user) {
        redirect('/login');
    }

    const handleAddBook = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const author = form.author.value;
        const coverImage = form.coverImage.value;
        const rating = form.rating.value;
        const genre = form.genre.value;
        const summary = form.summary.value;

        if (isNaN(rating) || rating < 1 || rating > 5) {
            setError("Rating must be a number between 1 and 5.");
            return;
        }

        setError(null);

        const newBook = {
            title,
            author,
            coverImage,
            rating: parseFloat(rating),
            genre,
            summary,
            userEmail: user?.email,
            userName: user?.displayName
        };

        axios.post('https://book-heaven-server-jade.vercel.app/books', newBook)
            .then(() => {
                Swal.fire({
                    title: "Book added successfully!",
                    icon: "success",
                    draggable: false
                });
                form.reset();
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message
                });
            });
    }

    return (
        <div className='my-16 mx-auto max-w-5xl'>
            <div className='form-container'>
                <h2 className='mx-auto text-3xl md:text-4xl font-extrabold text-primary'>Add a New Book</h2>
                <p className='text-secondary mx-auto mb-5'>Fill in the details to publish a new book.</p>

                <form onSubmit={handleAddBook} className='w-full'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-1'>
                                <label>Title</label>
                                <input name='title' type="text" className="input" placeholder="Enter book title" required />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label>Author</label>
                                <input name='author' type="text" className="input" placeholder="Enter author name" required />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label>Cover Photo URL</label>
                                <input name='coverImage' type="text" className="input" placeholder="Enter cover photo URL" required />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label>Rating</label>
                                <input name='rating' type="text" className="input" placeholder="Enter rating (1-5)" required />
                                {error && <span className='text-red-500 text-sm'>{error}</span>}
                            </div>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-1'>
                                <label>Genre</label>
                                <select name='genre' className="my-select cursor-pointer" required>
                                    <option value="">Select one</option>
                                    <option value="fiction">Fiction</option>
                                    <option value="non-fiction">Non-Fiction</option>
                                    <option value="mystery">Mystery</option>
                                    <option value="fantasy">Fantasy</option>
                                    <option value="biography">Biography</option>
                                    <option value="science-fiction">Science Fiction</option>
                                    <option value="romance">Romance</option>
                                    <option value="horror">Horror</option>
                                </select>
                            </div>
                            <div className='flex flex-col flex-1 gap-1'>
                                <label>Summary</label>
                                <textarea name='summary' className="input h-full p-2" placeholder="Enter book summary" required></textarea>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-end'>
                        <button className="btn btn-primary mt-4 flex items-center justify-center gap-2">
                            <FaPlus /> Add Book
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBooks;
