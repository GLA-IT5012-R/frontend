'use client'

import { useEffect, useState } from 'react'
// import { getHello } from '@/api/hello'

export default function Home() {
  const [msg, setMsg] = useState('')

 useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // 在浏览器控制台查看
        setMsg(data.message); // 假设 Django 返回了 { "message": "..." }
      })
      .catch((err) => console.error('Error:', err));
  }, [])

  return (
    <main>
      <h1>Next.js + Django</h1>
      <p>{msg}</p>
    </main>
  )
}
