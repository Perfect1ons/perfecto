import Lk from "@/components/Profile/Lk/Lk";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Профиль пользователя",
};

const page = () => {
  return <Lk />;
};

export default page;
