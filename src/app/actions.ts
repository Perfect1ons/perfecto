"use server";

import { cookies } from "next/headers";

export const getAccessToken = async (token: string) => {
  cookies().set("access-token", token, {
    path: "/",
    domain: "localhost",
    maxAge: 300,
    httpOnly: true,
    secure: false,
  });
};
