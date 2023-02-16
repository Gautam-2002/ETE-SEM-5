import React from 'react'
import { Link } from 'react-router-dom'
import './../css/aside.css'
function Aside() {
  return (
    <div className='aside-box'>
      <Link className='Link' to='/cart'>Cart</Link>
      <hr></hr>
      <Link className='Link' to='/Profile'>Your Orders</Link>
      <hr></hr>
    </div>
  )
}

export default Aside