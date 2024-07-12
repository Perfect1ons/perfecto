import AuthComponent from "@/components/temporary/CatalogFiltersByAbdulaziz/keek";
import { cookies } from "next/headers";
import React from "react";
import FavoriteAuth from "@/components/FavoritesComponents/FavoriteAuth/FavoriteAuth";

const page = () => {
  const cookieStore = cookies();
  const isAuthed = cookieStore.get("isAuthenticated")?.value;

  if (isAuthed) {
    return <AuthComponent />;
  }

  return <FavoriteAuth />;
};

export default page;
