import React from 'react'

export default function Loader() {
  return (
    <div className='div className="absolute w-full h-screen top-0 left-0 bg-opacity-50 items-center justify-center'>
        <div className="loader ease-linear rounded-full border-t-4 border-b-4 border-red-500 w-16 h-16 animate-spin"></div>
    </div>
  )
}
