import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req: NextRequest) {
    const cookieToken = cookies();
    const token = cookieToken.get("identify")?.value;

  if (!token && req.url == "http://localhost:3000/profile") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && req.url == "http://localhost:3000/favorites") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/profile/:path*", "/favorites/:path*"], // Применение middleware к этим маршрутам
};
