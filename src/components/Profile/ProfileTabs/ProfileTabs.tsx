"use client"
import styles from './style.module.scss'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { profileLinks } from '@/components/temporary/profileLinks';
import clsx from 'clsx';

const ProfileTabs = () => {
    const pathname = usePathname()
  return (
    <div className={styles.profile__tabs_container}>
      <div className={"container"}>
        <nav className={styles.profile__tabs}>
          {profileLinks.map((link) => {
            return (
              <Link
                className={clsx(
                  "link", styles.profile__link,
                  pathname === link.href && styles.profile__link_active
                )}
                key={link.id}
                href={link.href}
              >
                {link.count && <span className={styles.profile__link_count}>{link.count}</span> }
              {link.title}
              </Link>
            );
          })}
        </nav>
      </div>

    </div>
  );
}

export default ProfileTabs