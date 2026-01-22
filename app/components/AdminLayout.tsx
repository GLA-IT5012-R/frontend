import React, { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

interface Props {
  children: ReactNode
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
