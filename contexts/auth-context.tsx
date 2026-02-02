'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { loginApi } from '@/api/auth';
import { useRouter } from 'next/navigation';

type User = {
  id: number;
  username: string;
  role: 'user' | 'admin';
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (data: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 登录方法
  const login = async (data: { username: string; password: string }) => {
    const res = await loginApi(data); // 调用后端 /login/
    // 假设返回 { access, refresh, user }
    localStorage.setItem('Token', res.access);
    localStorage.setItem('RefreshToken', res.refresh);
    setToken(res.access);
    setUser(res.user);
    router.replace('/dashboard'); // 登录成功跳后台首页
  };

  // 登出方法
  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    router.replace('/login');
  };

  // 页面刷新/首次加载从 localStorage 读取 token
  useEffect(() => {
    const t = localStorage.getItem('Token');
    const r = localStorage.getItem('RefreshToken');
    const u = localStorage.getItem('User');
    if (t) setToken(t);
    if (u) setUser(u ? JSON.parse(u) : null);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
