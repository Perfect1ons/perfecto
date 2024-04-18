import cn from 'clsx'
import styles from './style.module.scss'
import { SearchIcon, SearchIconWhite } from '../../../public/Icons/Icons';
import Link from 'next/link';
import Logo from '../Logo/Logo';
import HeaderNav from './HeaderNav/HeaderNav';


const Header = () => {
  return (
    <header className={styles.header}>
      <div className={cn(styles.header__container, "container")}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <Link className={styles.catalog} href={'/catalog'}>
          Каталог
        </Link>

        <div className={styles.search}>
          <input
            placeholder='Искать товары и категории'
            type="text"
            id="searchInput"
            className={styles.search__input}
          />
          <label htmlFor="searchInput" className={styles.search__icon}>
            <SearchIcon />
          </label>
        </div>

        <div className={styles.header__nav}>
          <HeaderNav />
        </div>

        <div className={styles.search__white}>
          <SearchIconWhite/>
        </div>
      </div>
    </header>
  );
}

export default Header