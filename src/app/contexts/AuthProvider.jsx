"use client";

import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { onAuthStateChanged, signInWithPopup,GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';


const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const createUserWithPassword = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInWithPassword = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUserInfo = async (updatedInfo) => {
        await updateProfile(auth.currentUser, updatedInfo);
        await auth.currentUser.reload();
        setUser({ ...auth.currentUser });
    }

    const signOutUser =() =>{
        setLoading(true);
        return signOut(auth)
            .then(()=>{
                setUser(null);
                setLoading(false);
            })
            .catch((error)=>{
                setLoading(false);
                throw error;
            });
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    },[]);

    const authInfo = {
        signInWithGoogle,
        user,
        loading,
        signOutUser,
        createUserWithPassword,
        signInWithPassword,
        updateUserInfo,
        setLoading
    };

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;