import { type FC, type ReactNode } from 'react'

export const Wrapper:FC<{children:ReactNode}> = ({children}) => {
  return (
    <main className='wrapper'>{children}</main>
  )
}
