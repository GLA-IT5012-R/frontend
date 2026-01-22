import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. 拦截所有 /api 开头的请求
  if (pathname.startsWith('/api/')) {
    // 2. 构造 Django 完整 URL
    const DJANGO_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8787';
    const targetUrl = new URL(pathname, DJANGO_BASE);

    // 3. 保留查询参数
    targetUrl.search = request.nextUrl.search;

    // 4. 尾斜杠，避免 Django 301/308
    if (!targetUrl.pathname.endsWith('/')) {
      targetUrl.pathname += '/';
    }

    // 5. rewrite 请求，浏览器地址不变
    return NextResponse.rewrite(targetUrl);
  }

  // 其他请求正常
  return NextResponse.next();
}

// 只作用于 /api/*，避免静态资源触发
export const config = {
  matcher: '/api/:path*',
};
