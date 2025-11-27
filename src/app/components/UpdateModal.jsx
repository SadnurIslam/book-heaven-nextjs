"use client";

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const UpdateModal = ({ book, closeUpdateModal, setBook, setBooks, books }) => {
    const [error, setError] = useState(null);

    const handleUpdateBook = (event) => {
        event.preventDefault();
        const { title, author, coverImage, rating, genre, summary } = event.target;

        if (isNaN(rating.value) || rating.value < 1 || rating.value > 5) {
            setError("Rating must be a number between 1 and 5.");
            return;
        }
        setError(null);

        const updatedInfo = {
            title: title.value,
            author: author.value,
            coverImage: coverImage.value,
            rating: parseFloat(rating.value),
            genre: genre.value,
            summary: summary.value
        };

        axios.patch(`https://book-heaven-server-jade.vercel.app/books/${book._id}`, updatedInfo)
            .then(() => {
                Swal.fire({ title: "Book updated successfully!", icon: "success" });

                const updatedBook = { ...updatedInfo, _id: book._id, userEmail: book.userEmail, userName: book.userName };

                if (books && setBooks) setBooks(books.map(b => b._id === book._id ? updatedBook : b));
                if (setBook) setBook(updatedBook);
            })
            .catch(error => Swal.fire({ icon: "error", title: "Oops...", text: error.message }))
            .finally(() => closeUpdateModal());
    };

    return (
        <div className='modal-container max-w-5xl'>
            <h2 className='text-3xl md:text-4xl font-extrabold mb-3 text-center text-primry'>Update the Book</h2>
            <p className='text-secondary mb-5 text-center'>Edit any info to update the book.</p>

            <form onSubmit={handleUpdateBook} className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label>Title</label>
                        <input name='title' defaultValue={book.title} className='input' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label>Author</label>
                        <input name='author' defaultValue={book.author} className='input' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label>Cover Photo URL</label>
                        <input name='coverImage' defaultValue={book.coverImage} className='input' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label>Rating</label>
                        <input name='rating' defaultValue={book.rating} className='input' />
                        {error && <span className='text-red-500 text-sm'>{error}</span>}
                    </div>
                </div>

                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label>Genre</label>
                        <select name='genre' className='input select cursor-pointer'>
                            {["fiction","non-fiction","mystery","fantasy","biography","science-fiction","romance","horror"].map(g =>
                                <option key={g} value={g} selected={book.genre === g}>{g.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                            )}
                        </select>
                    </div>
                    <div className='flex flex-col gap-1 flex-1'>
                        <label>Summary</label>
                        <textarea name='summary' defaultValue={book.summary} className='input h-full p-2'></textarea>
                    </div>
                </div>

                <button className="btn btn-primary mt-4">Update Book</button>
            </form>

            <div className="modal-action mt-2">
                <button onClick={closeUpdateModal} className="btn btn-outline">Cancel</button>
            </div>
        </div>
    );
};

export default UpdateModal;
