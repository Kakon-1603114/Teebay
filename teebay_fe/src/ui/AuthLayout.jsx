import React from 'react'

const AuthLayout = ({children, heading, classname}) => {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
    <h1 className="text-4xl text-gray-600 tracking-tighter uppercase p-4">
      {heading}
    </h1>
    <div className={`${classname} flex justify-center items-center flex-col`}>
        {children}
        </div>
    </div>
  )
}

export default AuthLayout;