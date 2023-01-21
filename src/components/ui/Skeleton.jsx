import React from 'react'

const Skeleton = () => {
  return (
    <div className='animate-pulse'>
      <div className='bg-gray-200 py-48 rounded-md'></div>
      <div className='mt-6 bg-gray-200 py-5 w-1/2 rounded-md'></div>
      <div className='mt-8'>
        <p className='mt-2 py-3 bg-gray-200 rounded-md'></p>
        <p className='mt-2 py-3 bg-gray-200 rounded-md'></p>
        <p className='mt-2 py-3 bg-gray-200 rounded-md'></p>
        <p className='mt-2 py-3 bg-gray-200 rounded-md'></p>
      </div>
    </div>
  )
}

export default Skeleton
