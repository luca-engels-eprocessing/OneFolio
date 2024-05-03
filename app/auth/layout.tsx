import React, { ReactNode } from 'react'

type Props = {}

const AuthLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className="h-full w-full flex items-center justify-center" >
        {children}
    </div>
  )
}

export default AuthLayout