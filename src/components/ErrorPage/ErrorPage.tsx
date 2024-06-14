import styles from './style.module.scss'

const ErrorPage = () => {
  return (
    <div className={styles.error}>
      <h1>НА САЙТЕ ПРОИЗОШЛИ КРАТКОВРЕМЕННЫЕ ДОЖДИ</h1>
      <h1>ВОЗВРАЩАЙТЕСЬ ПОЗЖЕ</h1>
      <h1>ПРОСИМ ПРОЩЕНИЕ ЗА ДАННОЕ НЕДРАЗУМЕНИЕ</h1>
    </div>
  );
}

export default ErrorPage