import Link from 'next/link';
import clsx from 'clsx';
import { IBrandByName } from '@/types/Brands/brandByName';
import Cards from '../UI/Card/Card';
import BrandNotFound from '../NotFound/BrandNotFound';
import { IPopularGood } from '@/types/popularGoods';

interface IBrandByNameProps {
  goods: IPopularGood[]
  path: string;
  brand: IBrandByName;
  id: number;
  name: string
}

const BrandByName = ({ goods, path, brand, id, name }: IBrandByNameProps) => {
  return (
    <section className="brand__byName">
      <div className="container">
        <div className="all__directions">
          <Link href="/" className="all__directions_link">
            Главная
          </Link>
          <Link href="/brands" className="all__directions_link">
            Бренды
          </Link>
          <Link
            className={clsx(
              "all__directions_link",
              "all__directions_linkActive"
            )}
            href={`/brands/${path}-${id}`}
          >
              {path}
          </Link>
        </div>
        <h1 className='sections__title'>{path}</h1>
      </div>
      {brand.count === 0 ? (
        <BrandNotFound goods={goods} />
      ) : (
        <div className="cards">
          {brand.items.map((item, index) => (
            <Cards cardData={item} key={index} />
          ))}
        </div>
      )}
    </section>
  );
};

export default BrandByName;
