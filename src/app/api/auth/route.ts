import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const { accessToken, userId } = await request.json();

  if (!accessToken || !userId) {
    return NextResponse.json(
      { error: "Access token and userId are required" },
      { status: 400 }
    );
  }

  // Установка cookie с токеном и userId
  const response = NextResponse.json({
    message: "Token and userId saved successfully",
  });
  response.cookies.set("identify", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  response.cookies.set("userId", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return response;
}

export async function GET() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("identify");
  const userId = cookieStore.get("userId");

  if (!accessToken || !userId) {
    return NextResponse.json(
      { error: "No access token or userId found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ accessToken, userId });
}

export async function DELETE() {
  const response = NextResponse.json({
    message: "Token and userId deleted successfully",
  });
  response.cookies.set("identify", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: -1,
    path: "/",
  });
  response.cookies.set("userId", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: -1,
    path: "/",
  });

  return response;
}
