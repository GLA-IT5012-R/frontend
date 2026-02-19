'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from "@clerk/nextjs";
import { loginApi, authApi, syncUserApi } from '@/api/auth';

type User = {
  id: string;
  email: string;
  name: string;
  addresses?: any[];
  role?: 'user' | 'admin';
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loginAdmin: (data: { username: string; password: string }) => Promise<void>;
  loginUser: (email: string, code: string) => Promise<void>;
  loginUserFromData: (userData: User) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [clerkSynced, setClerkSynced] = useState(false); // 避免重复调用 Clerk 同步
  const { user: clerkUser, isSignedIn } = useUser();

  /** 
   * Clerk 用户同步到后端
   */
  const syncClerkUser = async (clerkUser: any) => {
    if (!clerkUser) return;

    const syncedId = localStorage.getItem("clerkSyncedId");
    if (syncedId === clerkUser.id) return; // 已经同步过，直接返回

    const email = clerkUser.emailAddresses[0]?.emailAddress;
    const name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim();
    const clerk_id = clerkUser.id;

    try {
      const res = await syncUserApi({ id: clerk_id, email, name });
      const userInfo = res.data.data;
      setUser(userInfo);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("clerkSyncedId", clerk_id); // 标记同步过
      setClerkSynced(true);
    } catch (err) {
      console.error("Sync clerk user failed:", err);
    }
  };


  /**
   * 后台管理员登录
   */
  const loginAdmin = async (data: { username: string; password: string }) => {
    const res = await loginApi(data);
    localStorage.setItem('Token', res.access);
    localStorage.setItem('RefreshToken', res.refresh);
    localStorage.setItem('User', JSON.stringify(res.user));
    setToken(res.access);
    setUser(res.user);
    router.replace('/dashboard');
  };

  /**
   * 前台邮箱验证码登录/注册
   */
  const loginUser = async (email: string, code: string) => {
    const res = await authApi.loginOrRegister(email, code);
    const userData: User = res.data?.data;
    if (!userData) throw new Error('未返回用户信息');
    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
  };

  const loginUserFromData = (userData: User) => {
    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    router.replace('/sign-in');
  };

  /** 
   * Clerk 登录变化监听
   */
  useEffect(() => {
    if (isSignedIn && clerkUser) {
      syncClerkUser(clerkUser);
    }
  }, [clerkUser, isSignedIn]);

  /**
   * 页面刷新/首次加载，从 localStorage 恢复用户信息
   */
  useEffect(() => {
    const u = localStorage.getItem('userInfo');
    if (u) {
      try {
        setUser(JSON.parse(u));
      } catch {
        localStorage.removeItem('userInfo');
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loginAdmin, loginUser, loginUserFromData, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
