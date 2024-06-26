import { ICategoryModel } from '@/types/Catalog/catalogFilters';
import styles from './style.module.scss';
import { IFiltersBrand } from '@/types/filtersBrand';
import FiltersByAbdulaziz from './FiltersByAbdulaziz';

interface IFilteredProps{
  filtered: ICategoryModel[];
  filters: IFiltersBrand;
}

const CatalogFilterByAbdulaziz = ({filtered, filters}: IFilteredProps) => {
  return (
    <section>
      <div className="container">
        <h1 className='section__title'>ЭТО МОЯ СТРАНИЦА ЭТО МОЙ ПРОЕКТ</h1>

        <FiltersByAbdulaziz filters={filters}/>
      </div>
    </section>
  )
}

export default CatalogFilterByAbdulaziz