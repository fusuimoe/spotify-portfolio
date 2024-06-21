import { ComponentPropsWithoutRef } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'

interface FloatingWindowProps extends ComponentPropsWithoutRef<'div'> {
  title?: string
  innerHeight?: number
  headerClassName?: string
  /** 透明というか、黒にする(Spotify用) */
  transparent?: boolean
}

const FloatingWindow = ({
  title,
  innerHeight,
  headerClassName,
  transparent = false,
  children,
  className,
}: FloatingWindowProps) => {
  return (
    <div
      className={twMerge(
        transparent
          ? 'bg-transparent'
          : 'border border-black bg-stone-50 shadow-xl dark:bg-stone-900',
        'overflow-hidden rounded-xl',
        'backdrop-blur-lg contrast-more:backdrop-blur-0',
        className
      )}
    >
      <div
        className={twMerge(
          'relative pt-14',
          transparent && 'rounded-b-xl bg-stone-800 dark:bg-black'
        )}
      >
        <div
          className={twJoin([
            'absolute left-0 top-0 z-50 flex w-full items-center justify-between border-b p-4',
            'border-black dark:border-white',
            'backdrop-blur-lg contrast-more:backdrop-blur-none',
            transparent && 'text-white',
            headerClassName,
          ])}
        >
          <span className="font-mono">{title}</span>
          {/* 飾りのウィンドウボタン */}
          <div aria-hidden="true" className="flex gap-2">
            {['bg-green-500', 'bg-yellow-500', 'bg-red-500'].map((bg, i) => {
              return (
                <div key={i} className={`h-4 w-4 rounded-full ${bg}`}></div>
              )
            })}
          </div>
        </div>
        <div
          style={{
            height: innerHeight ? `${innerHeight}px` : 'auto',
          }}
          className={`p-4 ${innerHeight && 'overflow-y-scroll'}`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default FloatingWindow
