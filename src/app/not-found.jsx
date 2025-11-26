"use client";

import Link from 'next/link';
import errorImg from './assets/error-404.png'
import Image from 'next/image';

const ErrorPage = () => {

    const previousRoute = typeof window !== 'undefined' && document.referrer ? document.referrer : '/';

    return (
        <div className='my-12 flex flex-col items-center text-center p-6'>
            <Image className='mx-auto mb-7 max-w-[60%] rounded-lg' src={errorImg} alt="404 Error" />
            <h3 className='text-3xl md:text-4xl text-primary font-extrabold mb-2'>Oops, page not found!</h3>
            <p className='text-secondary mb-6'>The page you are looking for is not available.</p>
            <Link
                href={previousRoute}
                className='inline-block bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-white font-semibold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 hover:opacity-90'
            >
                Go Back
            </Link>
        </div>
    );
};

export default ErrorPage;
