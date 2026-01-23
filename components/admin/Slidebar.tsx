'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menu = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Products', href: '/products' },
  { label: 'Orders', href: '/orders' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-4 font-bold text-xl">Admin</div>

      <nav className="space-y-1 px-2">
        {menu.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded px-3 py-2 text-sm
              ${pathname === item.href
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-slate-100'}
            `}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
