import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

interface SearchHistoryRequest {
  searchQuery: string;
}

export async function POST(req: NextRequest) {
  try {
    const { searchQuery }: SearchHistoryRequest = await req.json(); // Получение данных из тела запроса

    const cookieStore = cookies();
    const existingHistory = JSON.parse(
      cookieStore.get("searchHistory")?.value || "[]"
    );

    // Удаление существующего запроса из истории, если он есть
    const filteredHistory = existingHistory.filter(
      (query: string) => query !== searchQuery
    );

    // Добавление нового запроса в начало истории
    const updatedHistory = [searchQuery, ...filteredHistory];

    cookieStore.set("searchHistory", JSON.stringify(updatedHistory), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7, // 1 неделя
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
    const { searchQuery }: { searchQuery?: string } = await req.json();

    const cookieStore = cookies();
    const existingHistory = JSON.parse(
      cookieStore.get("searchHistory")?.value || "[]"
    );

    let updatedHistory;
    if (searchQuery) {
      // Удаление одного запроса из истории
      updatedHistory = existingHistory.filter(
        (query: string) => query !== searchQuery
      );
    } else {
      // Удаление всех запросов из истории
      updatedHistory = [];
    }

    cookieStore.set("searchHistory", JSON.stringify(updatedHistory), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7, // 1 неделя
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

interface SearchHistoryRequest {
  history: string[];
}


let searchHistory: string[] = [];

export async function PUT(req: NextRequest) {
  try {
    const { history }: SearchHistoryRequest = await req.json(); // Получение данных из тела запроса

    searchHistory = history;

    const cookieStore = cookies();
    cookieStore.set("searchHistory", JSON.stringify(searchHistory), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7, // 1 неделя
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