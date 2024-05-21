"use client"
import styles from './style.module.scss'
import { AuthIcon, CartIcon, FavoritesIcon } from '../../../../public/Icons/Icons';
import { ReactNode } from 'react';
import cn from 'clsx';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface ILinks {
    href: string,
    title: string,
    id: number,
    icon: ReactNode
}

const navLinks: ILinks[] = [
  {
    href: "/favorites",
    title: "Избранные",
    id: 1,
    icon: <FavoritesIcon />,
  },
  {
    href: "/auth",
    title: "Войти",
    id: 2,
    icon: <AuthIcon />,
  },
  {
    href: "/cart",
    title: "Корзина",
    id: 3,
    icon: <CartIcon />,
  },
];

const HeaderNav = () => {
  const pathname = usePathname();
  return (
    <nav className={styles.nav}>
        {
            navLinks.map((links) => {
                return (
                  <Link
                    href={links.href}
                    className={cn(
                      styles.nav__link,
                      pathname === links.href && styles.active
                    )}
                    key={links.id}
                  >
                    <div className={styles.nav__link_items}>
                      <div className={styles.nav__link_items_icon}>{links.icon}</div>
                      <h6 className={styles.nav__link_items_title}>{links.title}</h6>
                    </div>
                  </Link>
                );
            })
        }
    </nav>
  );
}

export default HeaderNav