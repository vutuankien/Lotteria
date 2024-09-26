import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const BlogItem = ({id,title,date,image}) => {
    console.log(id);
    return (
        <Link to={`/discount/${id}`} className='text-decoration-none'>
            <div className='w-100 p-2 border rounded-2 shadow border-2' key={id}>
            <div className='w-100 '>
                <img src={image} className='w-100' style={{height:'200px'}}/>
                <div>
                    <p className='fs-6 mt-2 fw-bold text-black'>{title}</p>
                    <p className='fw-medium text-dark'>{date}</p>
                </div>
                <div className='w-100 d-flex justify-content-center' style={{bottom:'10px'}}>
                    <button className='border-top w-100'>Đọc thêm</button>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default BlogItem