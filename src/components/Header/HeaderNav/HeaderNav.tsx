"use client"
import Link from 'next/link';
import styles from './style.module.scss'
import { AuthIcon, CartIcon, FavoritesIcon } from '../../../../public/Icons/Icons';
import { ReactNode } from 'react';
import cn from 'clsx';
import { usePathname } from 'next/navigation';

interface ILinks {
    href: string,
    title: string,
    id: number,
    icon: ReactNode
}

const navLinks: ILinks[] = [
  {
    href: "/favourites",
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
                    className={styles.nav__link}
                    key={links.id}
                    href={links.href}
                  >
                    <span
                      className={cn(
                        styles.nav__link_title,
                        pathname === links.href && styles.active
                      )}

                    >
                      {links.title}
                    </span>
                    {links.icon}
                  </Link>
                );
            })
        }
    </nav>
  );
}

export default HeaderNav