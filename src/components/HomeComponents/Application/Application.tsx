import clsx from 'clsx';
import styles from './style.module.scss'
import Link from 'next/link';
import Image from 'next/image';

const Application = () => {
  return (
    <section className={clsx(styles.application, "application")}>
      <div className={clsx(styles.application__container, "container")}>
        <div className={styles.application__content}>
          <h1 className={styles.application__content_title}>Загрузите приложение max.kg</h1>
          <div className={styles.application__content_link}>
            <Link
              href={
                "https://play.google.com/store/apps/details?id=kg.max.maxapp"
              }
            >
              <Image
                className={styles.application__img}
                src={
                  "https://max.kg/images/banner_app/xavailable_on_google.png.pagespeed.ic.64c0Fr-5dp.webp"
                }
                width={200}
                height={60}
                alt="google-play"
              />
            </Link>
            <Link
              href={
                "https://apps.apple.com/us/app/%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD-max-kg/id6475755307"
              }
            >
              <Image
                className={styles.application__img}
                src={
                  "https://max.kg/images/banner_app/xavailable_on_apple.png.pagespeed.ic.UqKRmIpHtw.webp"
                }
                width={200}
                height={60}
                alt="apple-store"
              />
            </Link>
          </div>
        </div>
        <div className={styles.application__content}>
          <Image
            className={styles.application__phone_img}
            src={
              "https://max.kg/images/banner_app/xmockup.png.pagespeed.ic.KUwe5oHaW-.webp"
            }
            width={513}
            height={347}
            alt="phone"
          />
        </div>
      </div>
    </section>
  );
}

export default Application