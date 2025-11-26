"use client";

import { FaXTwitter } from 'react-icons/fa6';
import { MdLocalLibrary } from 'react-icons/md';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="mt-20 border-t border-base-300 bg-base-200 dark:bg-base-300 text-base-content">
            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center text-center space-y-6">
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center gap-3"
                >
                    <MdLocalLibrary size={55} className="logo-color" />
                    <div>
                        <h2 className="text-2xl font-bold">The Book Haven</h2>
                        <p className="opacity-80 max-w-md text-sm md:text-base">
                            Your gateway to endless stories and knowledge.
                        </p>
                    </div>
                </motion.div>

                <motion.div 
                    className="flex gap-6 text-2xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <a href="#" aria-label="Twitter" className="social-icon">
                        <FaXTwitter />
                    </a>
                    <a href="#" aria-label="YouTube" className="social-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                    </a>
                    <a href="#" aria-label="Facebook" className="social-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                    </a>
                </motion.div>

                <p className="text-sm opacity-70">
                    © {new Date().getFullYear()} <span className="font-semibold">The Book Haven</span>. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
