import PopularGoods from '../HomeComponents/PopularGoods/PopularGoods';
import styles from './style.module.scss'

export interface IPopularProps {
  goods: any
}

const SeekNotFound = ({ goods }: IPopularProps) => {
  return (
    <section className="seek__not_founded">
      <div className="container">
        <h1>SeekNotFound</h1>
        <h1>SeekNotFound</h1>
        <h1>SeekNotFound</h1>
        <h1>SeekNotFound</h1>
        <h1>SeekNotFound</h1>
        <h1>SeekNotFound</h1>
        <h1>SeekNotFound</h1>
        <h1>SeekNotFound</h1>
        <h1>SeekNotFound</h1>
        <div className={styles.popGoods}>
          <PopularGoods goods={goods} />
        </div>
      </div>
    </section>
  );
};

export default SeekNotFound