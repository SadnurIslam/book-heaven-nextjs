"use client";

import Link from 'next/link';
import React, { useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const NoBookFound = () => {

    useEffect(() => {
        document.title = "No Book Found - The Book Heaven";
    });

    return (
        <div className="my-12 flex flex-col items-center justify-center p-6">
            <div className="rounded-2xl  p-8 text-center max-w-md">
                <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
                <h1 className="text-3xl md:text-4xl text-primary font-extrabold mb-2">No Book Found</h1>
                <p className="text-secondary mb-6">
                    Oops! The book you are looking for does not exist. It might have been removed or the URL is incorrect.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-white font-semibold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 hover:opacity-90"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NoBookFound;
