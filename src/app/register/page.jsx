"use client";

import React, { use, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdInformationCircle } from 'react-icons/io';
import { Tooltip } from 'react-tooltip';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { AuthContext } from '../contexts/AuthContext';

  

const Register = () => {
    
    const { signInWithGoogle, createUserWithPassword, setLoading, updateUserInfo, user, loading } = use(AuthContext);
    const router = useRouter();

    const [passwordError, setPasswordError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        document.title = "Register | The Book Heaven";
    }, []);

    const goHome = () => {
        router.push("/");
    };

    if (loading) {
        return <div className='flex justify-center items-center min-h-screen'>
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        </div>;
    }


    if (user) {
        redirect("/");
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const name = result.user.displayName;
                toast.success(`Welcome! ${name}`, { autoClose: 1000 });
                goHome();
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                toast.error(error.message, { autoClose: 2000 });
            });
    }

    const handleRegistration = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const photo = event.target.photo.value;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        setPasswordError(null);

        if (!passwordRegex.test(password)) {
            setPasswordError('Password must be at least 6 characters, with uppercase and lowercase letters.');
            return;
        }

        createUserWithPassword(email, password)
            .then(() => {
                updateUserInfo({ displayName: name, photoURL: photo });
                setLoading(false);
                toast.success(`Welcome! ${name}`, { autoClose: 1000 });
                goHome();
            })
            .catch(error => {
                setLoading(false);
                toast.error(error.message, { autoClose: 2000 });
            });
    }

    const handlePasswordShow = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="my-16">
            <div className="form-container max-w-md">
                <h2 className="text-primary text-3xl md:text-4xl font-extrabold mx-auto mb-0">Join The Book Haven</h2>
                <p className="text-secondary mx-auto mb-5">Start building your digital library today.</p>

                <form onSubmit={handleRegistration} className="flex flex-col gap-3">
                    <div className='flex flex-col gap-1'>
                        <label>Name</label>
                        <input name="name" type="text" className="input" placeholder="Enter your name" required />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label>Email</label>
                        <input name="email" type="email" className="input" placeholder="Enter your email" required />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <div className='flex gap-1 items-center'>
                            <label>Password</label>
                            <IoMdInformationCircle data-tooltip-id="info-tooltip" className=" text-gray-400" />
                        </div>
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
                            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                        </div>
                    </div>


                    {/* <div className="relative">
                        <input name="password" type="password" className="input" placeholder="Enter your password" />
                        
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    </div> */}

                    <div className='flex flex-col gap-1'>
                        <label>Photo URL</label>
                        <input name="photo" type="text" className="input" placeholder="Enter your photo URL" required />
                    </div>



                    <button type="submit" className="btn btn-primary w-full font-bold py-3">
                        Register
                    </button>
                </form>

                <button
                    onClick={handleGoogleSignIn}
                    className="btn btn-outline btn-secondary w-full font-bold py-3 mt-0 flex items-center justify-center gap-2"
                >
                    <Image src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5"
                        width={300} height={300}
                    />
                    Register with Google
                </button>

                <p className="text-center mt-4 text-secondary">
                    Already registered? <Link href="/login" className="text-blue-500 underline">Login here</Link>
                </p>
            </div>

            <Tooltip
                id="info-tooltip"
                place="bottom"
                className="bg-neutral-800 text-white rounded-md px-3 py-1 shadow-lg"
                content={
                    <ul className="text-sm space-y-1">
                        <li>Password must be at least 6 characters long.</li>
                        <li>Must contain at least one uppercase letter.</li>
                        <li>Must contain at least one lowercase letter.</li>
                    </ul>
                }
            />
        </div>
    );
};

export default Register;
