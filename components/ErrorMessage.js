import React from 'react'

const ErrorMessage = ({ children }) => {
  return (
    <div className='absolute top-4 left-full slide-in w-max rounded-sm p-4 text-cultured bg-french-rose font-bold text-lg shadow-sm shadow-space-cadet'>
      {children}
    </div>
  )
}

export default ErrorMessage
