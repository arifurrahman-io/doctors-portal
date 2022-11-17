import React from 'react';

const Review = ({ rev }) => {

    const { name, img, review, location } = rev;

    return (
        <div className=" card shadow-xl">
            <div className="card-body">
                <p>{review}</p>
            </div>
            <div className='flex p-6'>
                <div className='avatar'>
                    <div className='w-20 rounded-full ring-primary ring-4 mx-5'><img src={img} alt="" /></div>
                </div>
                <div className='my-auto'>
                    <h2 className="card-title">{name}</h2>
                    <p>{location}</p>
                </div>
            </div>
        </div>
    );
};

export default Review;