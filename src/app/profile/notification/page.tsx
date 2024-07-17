import NotFound from "@/app/not-found";
import ProfileTabs from "@/components/Profile/ProfileTabs/ProfileTabs";
import NotificationPage from "@/components/Profile/UserNotification/NotificationPage";
import NotificationSettings from "@/components/Profile/UserNotification/NotificationSettings/NotificationSettings";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Уведомления",
  description:
    "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
  keywords:
    "Оптом Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
};

interface NotificationProps {
  searchParams: {
    type?: string;
  };
}

const notification = ({ searchParams }: NotificationProps) => {
  const settingsPage = searchParams?.type;

  if (!settingsPage) {
    return (
      <div>
        <ProfileTabs />
        <NotificationPage />
      </div>
    );
  }

  if (settingsPage !== "notification") {
    return <NotFound />;
  }

  return (
    <div>
      <ProfileTabs />
      <NotificationSettings/>
    </div>
  );
};

export default notification;
