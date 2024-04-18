"use client"
import styles from "./style.module.scss";
import cn from "clsx";
import TextTruncate from "../UI/TruncatedText/TruncatedText";
import FooterAccordion from "../UI/FooterAccordion/FooterAccordion";
const Footer = () => {

  const linksCompany = [
    {
      id: 1,
      href: "/aboutCompany",
      content: "О компании",
    },
    {
      id: 2,
      href: "/contacts",
      content: "Контакты",
    },
    {
      id: 3,
      href: "/vacancies",
      content: "Вакансии",
    },
    {
      id: 4,
      href: "/termsOfSale",
      content: "Условия продажи",
    },
    {
      id: 5,
      href: "/charity",
      content: "Благотворительность",
    },
  ];
  const linksClients = [
    {
      id: 1,
      href: "/pickUpPoints",
      content: "Пункты выдачи",
    },
    {
      id: 2,
      href: "/clients",
      content: "Корпоративным клиентам",
    },
    {
      id: 3,
      href: "/installmentPlan",
      content: "Рассрочка",
    },
    {
      id: 4,
      href: "/tenders",
      content: "Тендеры",
    },
    {
      id: 5,
      href: "/bonuses",
      content: "Бонусы",
    },
    {
      id: 6,
      href: "/catalog",
      content: "Каталог товаров",
    },
    {
      id: 7,
      href: "/wholesale",
      content: "Оптовые продажи",
    },
    {
      id: 8,
      href: "/privacyPolicy",
      content: "Политика конфиденциальности",
    },
  ];
  const linksHelp = [
    {
      id: 1,
      href: "/order",
      content: "Как оформить заказ?",
    },
    {
      id: 2,
      href: "/payment",
      content: "Как оплатить?",
    },
    {
      id: 3,
      href: "/delivery",
      content: "Доставка",
    },
    {
      id: 4,
      href: "/guarantees",
      content: "Гарантии и возврат товаров",
    },
  ];
  const linksPartners = [
    {
      id: 1,
      href: "/sellers",
      content: "Продавцам",
    },
    {
      id: 2,
      href: "/suppliers",
      content: "Поставщикам",
    },
    {
      id: 3,
      href: "/advertising",
      content: "Реклама",
    },
    {
      id: 4,
      href: "/cooperation",
      content: "Сотрудничество",
    },
  ];
  const linksSocials = [
    {
      id: 1,
      href: "https://www.instagram.com/max.kg_/",
      content: "Instagram",
    },
    {
      id: 2,
      href: "https://www.youtube.com/channel/UCp8JzMc7t6XjWYJsZmDULjQ",
      content: "Youtube",
    },
    {
      id: 3,
      href: "https://www.facebook.com/www.max.kg",
      content: "Facebook",
    },
  ];

  return (
    <footer className={cn(styles.footer)}>
      <nav className={cn(styles.footerNav, "container")}>
      <FooterAccordion links={linksCompany} title="Компания"/>
      <FooterAccordion links={linksClients} title="Покупателям"/>
      <FooterAccordion links={linksHelp} title="Помощь"/>
      <FooterAccordion links={linksPartners} title="Партнерам"/>
      <FooterAccordion links={linksSocials} title="Мы в соцсетях"/>
      </nav>
     <div className={cn(styles.footerDescBlock, "container")}>
     <p className={styles.footerDescBlockTitle}>
        © 2016 - 2024 Компания «max.kg». Все данные, представленные на сайте,
        носят сугубо информационный характер и не являются исчерпывающими. Для
        более подробной информации следует обращаться к менеджерам компании по
        указанным на сайте телефонам. Вся представленная на сайте информация,
        касающаяся комплектации, технических характеристик, цветовых сочетаний,
        а также стоимости продукции носит информационный характер и ни при каких
        условиях не является публичной офертой, определяемой положениями
        Гражданского Кодекса Кыргызской Республики. Указанные цены являются
        рекомендованными и могут отличаться от действительных цен. Фото и
        характеристики товаров могут отличаться и уточняется при обращении в
        Интернет магазин
      </p>
      <div className={styles.textTruncate}>
          <TextTruncate text="© 2016 - 2024 Компания «max.kg». Все данные, представленные на сайте,
            носят сугубо информационный характер и не являются исчерпывающими. Для
            более подробной информации следует обращаться к менеджерам компании по
            указанным на сайте телефонам. Вся представленная на сайте информация,
            касающаяся комплектации, технических характеристик, цветовых сочетаний,
            а также стоимости продукции носит информационный характер и ни при каких
            условиях не является публичной офертой, определяемой положениями
            Гражданского Кодекса Кыргызской Республики. Указанные цены являются
            рекомендованными и могут отличаться от действительных цен. Фото и
            характеристики товаров могут отличаться и уточняется при обращении в
            Интернет магазин" maxLength={248}/>
      </div>
      <hr className={styles.footerDescBlockHr} />
      <p className={styles.footerDescBlockCOPYRIGHT}>
      Авторские права © max.kg 2016-2024 — Все права защищены
      </p>
     </div>
    </footer>
  );
};

export default Footer;
