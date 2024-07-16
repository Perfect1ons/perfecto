import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const { accessToken } = await request.json();

  if (!accessToken) {
    return NextResponse.json(
      { error: "Access token is required" },
      { status: 400 }
    );
  }

  // Установка cookie с токеном
  const response = NextResponse.json({ message: "Token saved successfully" });
  response.cookies.set("identify", accessToken, {
    httpOnly: true, // чтобы cookie не было доступно через JavaScript
    secure: process.env.NODE_ENV === "production", // чтобы использовать только HTTPS в продакшене
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // срок жизни cookie 1 неделя
    path: "/",
  });

  return response;
}

export async function GET() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("identify");

  if (!accessToken) {
    return NextResponse.json(
      { error: "No access token found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ accessToken });
}

export async function DELETE() {
  const response = NextResponse.json({ message: "Token deleted successfully" });
  response.cookies.set("identify", "", {
    httpOnly: true, // чтобы cookie не было доступно через JavaScript
    secure: process.env.NODE_ENV === "production", // чтобы использовать только HTTPS в продакшене
    maxAge: -1, // установить срок жизни cookie в прошлое, чтобы удалить его
    path: "/",
  });

  return response;
}
