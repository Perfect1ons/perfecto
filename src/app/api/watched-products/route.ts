import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export interface WatchedItem {
  id: string;
  id_tov: string;
  id_post: string;
  old_price: number;
  discount_prc: number;
  naim: string;
  ddos: string;
  cenaok: number;
  url: string;
  photos: { url_part: string }[];
  ocenka: number;
  status: number;
  minQty: number;
}

export async function POST(req: NextRequest) {
  try {
    const item: WatchedItem = await req.json();
    const cookieStore = cookies();
    const existingWatched = JSON.parse(
      cookieStore.get("youWatched")?.value || "[]"
    );

    const filteredWatched = existingWatched.filter(
      (watchedItem: WatchedItem) => watchedItem.id_tov !== item.id_tov
    );

    const updatedWatched = [item, ...filteredWatched];

    console.log("Updated Watched Items:", updatedWatched); // Debugging line

    cookieStore.set("youWatched", JSON.stringify(updatedWatched), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24,
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



