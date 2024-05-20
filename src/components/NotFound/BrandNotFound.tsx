import Image from 'next/image';
import styles from './style.module.scss'

const BrandNotFound = () => {
  return (
    <section className={styles.brand__notFounded}>
      <div className="container">
        <div className={styles.not__found_img}>
          <Image
            src={"/img/undefinedPage.png"}
            width={180}
            height={180}
            alt="undefined"
            loading="lazy" // Добавлен атрибут loading="lazy" для ленивой загрузки изображения
          />
        </div>
        <h1>По вашему бренду ничего не найдено</h1>
      </div>
    </section>
  );
}

export default BrandNotFound