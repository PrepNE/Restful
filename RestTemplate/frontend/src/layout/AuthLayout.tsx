import React from 'react'

const AuthLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <div className='flex min-h-screen w-full'>
        <div className='flex flex-col justify-center px-4 py-12 w-full lg:w-[40%]'>
            {children}
        </div>
        <div className='relative hidden w-[60%] flex-1 lg:block'>
            <img 
              src="/gradient.jpeg"
              className='absolute inset-0 h-full w-full object-cover  rounded-l-3xl'
            />
            {/* <div className='absolute inset-0 w-full h-full bg-primary rounded-l-3xl'/> */}
        </div>
    </div>
  )
}

export default AuthLayout