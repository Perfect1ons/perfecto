import styles from '../style.module.scss'

interface IDateProps {
  date: number | string;
}

const formatDate = (dateString: string): string => {
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const date = new Date(dateString);

  const day = date.getDate();
  const month = months[date.getMonth()];
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${hours}:${minutes}`;
};

const ReviewDate: React.FC<IDateProps> = ({ date }) => {
  const formattedDate = formatDate(date.toString());

  return <p className={styles.card__header_date}>{formattedDate}</p>;
};

export default ReviewDate;
