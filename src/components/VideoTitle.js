import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-transparent'>
      <h1 className='font-bold text-5xl text-white pt-24'>{title}</h1>
      <p className='text-base py-6 w-1/3 text-white'>{overview}</p>
        <div>
          <button className='bg-white text-black px-12 p-4 text-xl rounded-lg hover:bg-opacity-80'>
          ▷Play</button>
          <button className='mx-2 bg-gray-500 text-whit px-12 p-4 text-xl bg-opacity-50 rounded-lg'>
          ⓘ More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle;