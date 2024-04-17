import cn from 'clsx'
import styles from './style.module.scss'
import Logo from '../Logo/Logo';
import HeaderNav from './HeaderNav/HeaderNav';


const Header = () => {
  return (
    <header className={styles.header}>
      <div className={cn(styles.header__container, "container")}>
        
        <div className={styles.logo}>
            <Logo/>
        </div>

        <div className={styles.catalog}>

        </div>

        <div className={styles.search}>

        </div>

        <div className={styles.header__nav}>
            <HeaderNav/>
        </div>

      </div>
    </header>
  );
}

export default Header