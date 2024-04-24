"use client"
import styles from './style.module.scss'
import { AuthIcon, CartIcon, FavoritesIcon } from '../../../../public/Icons/Icons';
import { ReactNode } from 'react';
import cn from 'clsx';
import { usePathname, useRouter } from 'next/navigation';

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
  const router = useRouter();
  return (
    <nav className={styles.nav}>
        {
            navLinks.map((links) => {
                return (
                  <p
                    className={cn(styles.nav__link, pathname === links.href && styles.active)}
                    key={links.id}
                    onClick={() => router.push(links.href)}
                  >
                    <span
                      className={cn(
                        styles.nav__link_title
                      )}
                    >
                      {links.title}
                    </span>
                    {links.icon}
                  </p>
                );
            })
        }
    </nav>
  );
}

export default HeaderNav