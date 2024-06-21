import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

const Container = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      className={twMerge(
        className,
        'mx-auto max-w-full px-4 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl'
      )}
      {...props}
    />
  )
}

export default Container
