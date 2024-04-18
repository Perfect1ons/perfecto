import NotFounded from "@/components/NotFound/NotFound";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Страница не найдена | MaxKg",
  description:
    "К сожалению запрошенная вами страница не существует - Ошибка #404",
};

const NotFound = () => {
  return (
    <NotFounded/>
  );
};

export default NotFound;
