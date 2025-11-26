import React from 'react';


const Skeleton = ({ count }) => {
    return (
        <>
            {
                Array.from({ length: count || 6 }).map((_, index) => (
                    <div className=" flex h-full flex-col gap-4" key={index}>
                        <div className="bg-gray-500 skeleton w-full h-[150px] md:h-[200px] lg:h-[300px]"></div>
                        <div className="bg-gray-500 skeleton h-4 w-28"></div>
                        <div className="bg-gray-500 skeleton h-4 w-full"></div>
                        <div className="bg-gray-500 skeleton h-4 w-full"></div>
                    </div>
                ))
            }
        </>
    );
};

export default Skeleton;

