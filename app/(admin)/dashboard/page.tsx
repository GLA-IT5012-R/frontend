'use client';

import { useEffect, useState } from 'react';
import { getTestAuth } from '@/api/auth';

export default function page() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getTestAuth(); // axios 自动带 token
        setMsg(res.message);
      } catch (err) {
        setMsg('Unauthorized');
      }
    };
    checkAuth();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{msg}</p>
    </div>
  );
}
