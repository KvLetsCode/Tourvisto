import React from 'react'
import { Link } from 'react-router-dom'

const Congrats = () => {
  return (
      <main style={{ backgroundImage: "url('/assets/images/bg.jpg')" }} className='bg-contain border border-t-gray-200 h-[90dvh] w-full'>
          <section className='flex flex-col items-center  max-w-md mx-auto p-4 gap-3 bg-white/80 mt-[10rem]'>
              <img src="/assets/images/check.png" alt="" className='size-30' />
              <h1 className='font-bold text-2xl'>Thank You & Welcome Aboard!</h1>
              <p className='text-center font-semibold'>Your trip’s booked — can’t wait to have you on this adventure! 🌍️ Get ready to explore & make memories.✨</p>
              <Link to='/' className='flex gap-2 bg-white shadow-200 w-full items-center justify-center p-2 rounded-xl'>
                  <img src="/assets/icons/arrow-left.svg" alt="" />
                  <p className='font-semibold'>Return to Homepage</p>
              </Link>
          </section>
    </main>
  )
}

export default Congrats