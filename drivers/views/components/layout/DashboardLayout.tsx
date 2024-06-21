import Link from 'next/link'
import { ReactNode } from 'react'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen w-screen flex-col">
      <main className="flex grow flex-col">{children}</main>
      <footer className="flex grow-0 flex-col items-center bg-black p-8 text-center">
        <Link href="/">
          <button>return to top</button>
        </Link>
      </footer>
    </div>
  )
}
export default DashboardLayout
