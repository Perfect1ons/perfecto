import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface FavoriteData {
  id: string;
  id_tov: string;
  id_post: string;
  old_price: number;
  discount_prc: number;
  naim: string;
  ddos: string;
  cenaok: number;
  url: string;
  photos: string[];
  ocenka: number;
  status: string;
}

export async function POST(req: NextRequest) {
  try {
    const favoriteData: FavoriteData = await req.json(); // Получение данных из тела запроса

    const cookieStore = cookies(); // Получение кук с помощью next/headers
    const existingFavorites = JSON.parse(
      cookieStore.get("favorites")?.value || "[]"
    );

    // Проверяем, есть ли уже такой товар в избранном
    const isAlreadyFavorite = existingFavorites.some(
      (item: FavoriteData) => item.id === favoriteData.id
    );

    if (isAlreadyFavorite) {
      return NextResponse.json({
        success: true,
        message: "Item already in favorites",
      });
    }

    // Добавляем новый товар в список избранных
    const updatedFavorites = [...existingFavorites, favoriteData];

    cookieStore.set("favorites", JSON.stringify(updatedFavorites), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 365, // 1 год
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

export async function DELETE(req: NextRequest) {
  try {
    const { id }: { id: string } = await req.json(); // Получение данных из тела запроса

    const cookieStore = cookies(); // Получение кук с помощью next/headers
    const existingFavorites = JSON.parse(
      cookieStore.get("favorites")?.value || "[]"
    );

    // Фильтруем избранные товары, исключая указанный id
    const updatedFavorites = existingFavorites.filter(
      (item: FavoriteData) => item.id !== id
    );

    cookieStore.set("favorites", JSON.stringify(updatedFavorites), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 365, // 1 год
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

export async function PUT(req: NextRequest) {
  try {
    const { favoriteItems }: { favoriteItems: FavoriteData[] } =
      await req.json(); // Получение данных из тела запроса

    const cookieStore = cookies(); // Получение кук с помощью next/headers
    cookieStore.set("favorites", JSON.stringify(favoriteItems), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 365, // 1 год
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
