
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  menuClosed,
  menuToggled,
  selectMenuOpen,
  selectTheme,
  themeToggled,
} from '@/lib/features/ui/uiSlice';

type NavLink = {
  href: string;
  label: string;
};

const links: NavLink[] = [
  { href: '/', label: 'Trang chủ' },
  { href: '/counter', label: 'Counter' },
  { href: '/todos', label: 'Todo' },
  { href: '/products', label: 'Sản phẩm' },
  { href: '/notes', label: 'Ghi chú' },
];

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const theme = useAppSelector(selectTheme);
  const menuOpen = useAppSelector(selectMenuOpen);

  const isActive = (href: string): boolean =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const linkClass = (href: string): string =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive(href)
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-extrabold text-blue-600">
          Next<span className="text-gray-900 dark:text-white">RTK</span>
        </Link>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={linkClass(l.href)}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Bài 4 sẽ chèn CartBadge ở đây */}
          <button
            onClick={() => dispatch(themeToggled())}
            className="rounded-lg p-2 text-lg transition hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Đổi giao diện sáng/tối"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button
            onClick={() => dispatch(menuToggled())}
            className="rounded-lg p-2 hover:bg-gray-100 md:hidden dark:hover:bg-gray-800"
            aria-label="Mở menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {menuOpen && (
        <ul className="flex flex-col gap-1 border-t border-gray-200 px-4 py-2 md:hidden dark:border-gray-800">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => dispatch(menuClosed())}
                className={`block ${linkClass(l.href)}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
