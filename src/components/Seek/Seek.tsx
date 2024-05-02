import { ISeekCatalog, ISeekItem, ISeekItems } from '@/types/Search/seek'
import React from 'react'
import Cards from '../UI/Card/Card';
import SeekCards from './SeekCard';

export interface ISeekProps{
    catalog: ISeekCatalog[],
    product: ISeekItems

}

const Seek = ({catalog, product}: ISeekProps) => {
  return (
    <section className="seek">
      <div className="main__news_cards">
        {product.items.map((item, index) => {
          return <SeekCards cardData={item} key={index} />;
        })}
      </div>
    </section>
  );
}

export default Seek