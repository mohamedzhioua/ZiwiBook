import React from 'react'
import { Link } from 'react-router-dom'
import errorImg from '../../icons/404Error.png'
import {ImSad} from 'react-icons/im'
import  './index.css'

// 404 page
const NotFound = () => {
  return (
    <div className='text-center'>
    <img className='error-img' alt='error' src={errorImg} />
    <p className='mb-0 mt-3 text-error'>
        <ImSad /> Looks like this page does not
        exist.
    </p>
    <p className='mt-0 text-error'>
        Go Back to the <Link className="link" to='/'>Home Page</Link>
    </p>
</div>
  )
}

export default NotFound