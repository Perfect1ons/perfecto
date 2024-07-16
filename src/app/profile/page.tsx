import { cookies } from "next/headers";
import React from "react";
import FavoriteAuth from "@/components/FavoritesComponents/FavoriteAuth/FavoriteAuth";
import Profile from "@/components/Profile/Profile";
import ProfileTabs from "@/components/Profile/ProfileTabs/ProfileTabs";
import { Metadata } from "next";
import { getPersonalDataProfileServer } from "@/api/requests";

export const metadata: Metadata = {
  title: "Личный кабинет",
};

const page = async () => {
  const cookieStore = cookies();
  const isAuthed = cookieStore.get("identify")?.value;

  if (isAuthed) {
    const profileData = await getPersonalDataProfileServer(isAuthed);
    return (
      <>
        <ProfileTabs />
        <Profile data={profileData} />
      </>
    );
  }

  return <FavoriteAuth />;
};

export default page;
