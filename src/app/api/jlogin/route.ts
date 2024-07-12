import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

interface AuthRequest {
  phoneNumber: string;
}

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber }: AuthRequest = await req.json();

    // Проверка номера телефона (например, через код подтверждения)
    const isValidPhoneNumber = true; // Здесь должна быть логика проверки

    if (isValidPhoneNumber) {
      const cookieStore = cookies();
      cookieStore.set("isAuthenticated", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 7, // 1 неделя
        sameSite: "strict",
        path: "/",
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid phone number" },
        { status: 400 }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: "Unknown error" },
        { status: 500 }
      );
    }
  }
}

export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const isAuthenticated =
      cookieStore.get("isAuthenticated")?.value === "true";

    if (isAuthenticated) {
      return NextResponse.json({ isAuthenticated: true });
    } else {
      return NextResponse.json({ isAuthenticated: false });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { isAuthenticated: false, error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { isAuthenticated: false, error: "Unknown error" },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const cookieStore = cookies();
    cookieStore.set("isAuthenticated", "false", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 0, // Удалить куки
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: "Unknown error" },
        { status: 500 }
      );
    }
  }
}
