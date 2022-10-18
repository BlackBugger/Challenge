// DEVELOPING
import React, { useEffect, useState } from 'react'
import amy from "../images/avatars/image-amyrobson.png";
import setAddReply from '../App';
import createReply from '../App';

export default function UpdateCard() {


    return (

        <div className='comment-reply'>
            <div className='user'>
                <img src={amy} alt='avatar' />
            </div>
            <div className='comment-box-area d-flex align-items-center'>
                <textarea id='text' placeholder='Add a comment...' onChange={(e) => setAddReply(e.target.value)}></textarea>
            </div>
            <button className='send-reply' onClick={createReply}>
                REPLY
            </button>
        </div>


    )
}
