export interface IProfileLinks {
  href: string;
  title: string;
  id: number;
}

export const profileLinks: IProfileLinks[] = [
  {
    href: "/profile",
    title: "Главная",
    id: 1,
  },
  {
    href: "/profile/pd",
    title: "Личные данные",
    id: 2,
  },
  {
    href: "/profile/orders",
    title: "Текущие заказы",
    id: 3,
  },
  {
    href: "/profile/orders/history",
    title: "История заказов",
    id: 4,
  },
  {
    href: "/profile/notification",
    title: "Уведомления",
    id: 5,
  },
  {
    href: "/cart",
    title: "Корзина",
    id: 6,
  },
  {
    href: "/favorites",
    title: "Избранное",
    id: 7,
  },
];
