import AuthComponent from "@/components/temporary/CatalogFiltersByAbdulaziz/keek";
import { cookies } from "next/headers";
import React from "react";
import FavoriteAuth from "@/components/FavoritesComponents/FavoriteAuth/FavoriteAuth";
import Profile from "@/components/Profile/Profile";
import ProfileTabs from "@/components/Profile/ProfileTabs/ProfileTabs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Личный кабинет",
};

const page = () => {
  const cookieStore = cookies();
  const isAuthed = cookieStore.get("isAuthenticated")?.value;

  if (isAuthed) {
    return (
      <>
        <ProfileTabs/>
        <Profile  />
        <AuthComponent />
      </>
    );
  }

  return <FavoriteAuth />;
};

export default page;
