import Link from 'next/link';
import clsx from 'clsx';
import { IBrandByName } from '@/types/Brands/brandByName';
import Cards from '../UI/Card/Card';
import NotFounded from '../NotFound/NotFound';
import BrandNotFound from '../NotFound/BrandNotFound';

interface IBrandByNameProps {
  path: string;
  brand: IBrandByName;
  id: number;
}

const BrandByName = ({ path, brand, id }: IBrandByNameProps) => {
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
      </div>
      {brand.count === 0 ? (
        <BrandNotFound />
      ) : (
        <div className="main__news_cards top pad">
          {brand.items.map((item, index) => (
            <Cards cardData={item} key={index} />
          ))}
        </div>
      )}
    </section>
  );
};

export default BrandByName;
