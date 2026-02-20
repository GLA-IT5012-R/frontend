'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { toast } from 'sonner'; // 可选 toast 提示登录失败/成功

export default function LoginPage() {
  const { loginAdmin: login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login({ username, password });
      toast.success("Login successful!");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-8 border border-gray-200">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 rounded-md transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Use your super admin account
        </p>
      </div>
    </div>
  );
}
