import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req: NextRequest) {
    const cookieToken = cookies();
    const token = cookieToken.get("identify")?.value;

  if (!token ) {
    return NextResponse.redirect(new URL("/", req.url));
  }


  return NextResponse.next();
}


export const config = {
  matcher: ["/profile/:path*", "/favorites/:path*"], // Применение middleware к этим маршрутам
};
