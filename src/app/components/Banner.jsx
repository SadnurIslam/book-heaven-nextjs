"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Banner = () => {
    return (
        <section className="relative flex flex-col justify-center items-center text-center min-h-[500px] md:min-h-[600px] overflow-hidden my-14 rounded-xl">
            <div className="absolute inset-0">
                <Image
                    src="https://i.ibb.co.com/jPWMy2bQ/banner.png"
                    className="w-full h-full object-cover opacity-90"
                    alt="Banner Background"
                    fill
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <motion.div
                className="relative z-10 max-w-3xl px-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
            >
                <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg leading-tight">
                    <span className='text-white'>Welcome to</span> <span className="text-blue-500">The Book Haven</span>
                </h1>
                <p className="text-gray-200 mt-4 text-base md:text-lg">
                    Your Personal Digital Library — Discover, Curate, and Create.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                        <Link href="/all-books" className="btn btn-primary px-6 shadow-md ">
                            Explore All Books
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                        <Link href="/add-book" className="btn btn-outline btn-accent px-6">
                            Add a New Book
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Banner;
