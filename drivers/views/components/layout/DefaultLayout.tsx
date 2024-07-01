import { ReactNode } from 'react'

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="no-scrollbar flex min-h-screen flex-col overflow-x-hidden bg-white dark:bg-black dark:text-white">
      <main>{children}</main>
    </div>
  )
}
export default DefaultLayout
