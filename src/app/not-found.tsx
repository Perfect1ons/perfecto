import Application from "@/components/HomeComponents/Application/Application";
import NotFounded from "@/components/NotFound/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Страница не найдена | MaxKg",
  description:
    "К сожалению запрошенная вами страница не существует - Ошибка #404",
};

const NotFound = () => {
  return (
    <>
    <NotFounded/>
    <Application/>
    </>
  );
};

export default NotFound;
