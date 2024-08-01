import { getNotification } from "@/api/requests";
import NotFound from "@/app/not-found";
import NotificationPage from "@/components/Profile/UserNotification/NotificationPage";
import NotificationSettings from "@/components/Profile/UserNotification/NotificationSettings/NotificationSettings";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

export const metadata: Metadata = {
  title: "Уведомления",
  description:
    "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
  keywords:
    "Оптом Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
};

export const revalidate = 1;

interface NotificationProps {
  searchParams: {
    type?: string;
  };
}

export default async function page({ searchParams }: NotificationProps) {
  const cookieStore = cookies();
  const settingsPage = searchParams?.type;
  const isAuthed = cookieStore.get("identify")?.value;
  const userId = cookieStore.get("userId")?.value;

  if (isAuthed && userId) {
    try {
      const notification = await getNotification(parseInt(userId));
      if (!settingsPage) {
        return <NotificationPage notifications={notification} />;
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (settingsPage !== "notification") {
    return <NotFound />;
  }

  return <NotificationSettings />;
}
