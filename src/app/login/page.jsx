"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthContext';
import { redirect, useRouter } from 'next/navigation';



const Login = () => {
    const { signInWithGoogle, signInWithPassword, setLoading, user, loading } = use(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    
    const router = useRouter();

    const goHome = () => {
        router.push("/");
    };

    if(loading){
        return <div className='flex justify-center items-center min-h-screen'>
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        </div>;
    }

    
    if(user){
        redirect("/");
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const name = result.user.displayName;
                setLoading(false);
                toast.success(`Welcome! ${name}`, { autoClose: 1000 });
                goHome();
            })
            .catch(error => {
                toast.error(error.message, { autoClose: 2000 });
                setLoading(false);
            });
    }

    const handleSignIn = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        signInWithPassword(email, password)
            .then(result => {
                const user = result.user;
                toast.success(`Welcome back! ${user.displayName}`, { autoClose: 1000 });
                setLoading(false);
                goHome();
            })
            .catch(error => {
                toast.error(error.message, { autoClose: 2000 });
                setLoading(false);
            });
    }

    const handlePasswordShow = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="my-16">
            <div className="form-container max-w-md">
                <h2 className="text-3xl md:text-4xl font-extrabold mx-auto">Welcome Back</h2>
                <p className="text-secondary mx-auto mb-5">Log in to your account to continue.</p>

                <form onSubmit={handleSignIn} className="flex flex-col gap-3">
                    <div className='flex flex-col gap-1'>
                        <label>Email</label>
                        <input name="email" type="email" className="input" placeholder="Enter your email" required />
                    </div>

                    {/* <input name="password" type="password" className="input" placeholder="Enter your password" required /> */}

                    <div className='flex flex-col gap-1'>
                        <label>Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="input w-full bg-[#1B1B33] text-gray-300 focus:text-white focus:ring-2 focus:ring-pink-500 focus:outline-none rounded-lg"
                                placeholder="Enter your password"
                                required
                            />
                            <p
                                type="button"
                                className="show-password"
                                onClick={handlePasswordShow}
                            >
                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </p>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full font-bold py-3">
                        Login
                    </button>
                </form>

                <button
                    onClick={handleGoogleSignIn}
                    className="btn btn-outline btn-secondary w-full font-bold py-3 mt-0 flex items-center justify-center gap-2"
                >
                    <Image src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" width={300} height={300}/>
                    Login with Google
                </button>

                <p className="text-center mt-4 text-secondary">
                    Don't have an account? <Link href="/register" className="text-blue-500 underline">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
