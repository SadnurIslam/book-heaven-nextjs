"use client";

import React, { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import BooksCard from '../components/BooksCard';
import axios from 'axios';
import Skeleton from '../components/Skeleton';


const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('default');
  //   const axios = useAxios();

  useEffect(() => {
    document.title = "All Books | The Book Heaven";
  }, []);

  useEffect(() => {
    axios
      .get('https://book-heaven-server-jade.vercel.app/books')
      .then((response) => setBooks(response.data))
      .catch((error) => console.error('Error fetching books:', error))
      .finally(() => setLoading(false));
  }, []);


  const handleSort = async (e) => {
    const value = e.target.value;
    setSort(value);
    try {
      setLoading(true);
      const res = await axios.get(`https://book-heaven-server-jade.vercel.app/books${value === 'default' ? '' : `?sort=${value}`}`);
      setBooks(res.data);
    } catch (error) {
      toast.error('Error sorting books: ' + error.message, { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="my-12 w-full mx-auto px-0 md:px-4">
      <div className="text-center mb-10 ">
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Our Digital Collection</h2>
        <p className="text-secondary opacity-80 mt-2 text-sm md:text-base">
          Browse, search, and discover your next favorite book from our extensive library.
        </p>
      </div>

      <div className="flex justify-end mb-10">
        <select
          onChange={handleSort}
          name="sort"
          value={sort}
          className="select select-bordered select-sm md:select-md font-medium"
        >
          <option value="default">Sort By Rating</option>
          <option value="rating_asc">Low to High</option>
          <option value="rating_desc">High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">

        {
          loading ? (
            <Skeleton times={12} />
          ) : books.map(book => <BooksCard key={book._id} book={book} />)
        }

      </div>
    </section>
  );
};

export default AllBooks;
