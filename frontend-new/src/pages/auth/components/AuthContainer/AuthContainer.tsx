import type { ReactNode } from "react"

export interface AuthContainerProps {
    children: ReactNode
}

export const AuthContainer = ({ children }: AuthContainerProps) => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[350px] w-[350px] lg:w-[400px] bg-[#eeeeee] shadow-lg rounded-lg p-4 py-10`}
      style={{ boxShadow: '16px 16px 32px #c8c8c8, -16px -16px 32px #fefefe' }}>
      {children}
    </div>
  )
}

