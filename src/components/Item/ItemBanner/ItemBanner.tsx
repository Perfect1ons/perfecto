import Image from 'next/image'

const ItemBanner = () => {
  return (
    <Image
      className='testoviy'
      src="https://max.kg/images/news/temp/news_1686912916.jpg"
      width={400}
      height={250}
      alt="Нурболот"
    />
  );
}

export default ItemBanner