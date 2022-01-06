import React from 'react'

const Footer = () => {
  return (
    <div
      className={`mt-4 p-4 flex justify-center bg-opacity-80 backdrop-blur-sm bg-cultured w-screen rounded-t-sm`}>
      <p className='w-4/5 md:w-1/2 text-center'>
        Created by{' '}
        <a className='text-french-rose' href='https://matyi.tech'>
          Matyi Kari
        </a>
      </p>
    </div>
  )
}

export default Footer
