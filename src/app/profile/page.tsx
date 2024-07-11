import AuthComponent from "@/components/temporary/CatalogFiltersByAbdulaziz/keek";
import { cookies } from "next/headers";
import React from "react";
import NotFound from "../not-found";

const page = () => {
  const cookieStore = cookies();
  const isAuthed = cookieStore.get("isAuthenticated")?.value;

  if (isAuthed) {
    return <AuthComponent />;
  }

  return <NotFound />;
};

export default page;
