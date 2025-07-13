'use client';
import React from 'react'

const Eventhandling = () => {
  return (

    <div className='py-20'>
      <h1 className='text-5xl text-center font-blod'>Event handling</h1>
      <button className='bg-black text-white p-5' onClick={() => { alert('Button Clicked') }}>Click Event</button>
      <div className='bg-blue-800 p-5 h-40 w-40'
        onMouseMove={(e) => {
          console.log(e.clientX, e.clientY);
        }}>Move Momo haaahaha</div>
      <input type="text"
        className='border-2 p-3 w-1/2'
        onKeyDown={(e) => {
          console.log("key pressed:", e.key);
          console.log("key pressed :", e.code);

        }} placeholder='type something and press keys' />
      <input type="text" className='border-2 block p-3 w-1/2' onChange={(e) => { console.log(e.target.value); }} />
      <input type="color" onChange={(e) => { document.body.style.backgroundColor = e.target.value }} />
    </div>

  )
}

export default Eventhandling;