import React from 'react'
import Aside from './Aside'
import Items from './Items'
import './../css/app.css'

function Display() {
  return (
    <>
    
    <div className="display">
        <Aside/>
        <Items />
    </div>
    </>
  )
}

export default Display