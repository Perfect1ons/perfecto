import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

interface CityRequest {
  city: string;
}

export async function POST(req: NextRequest) {
  try {
    const { city }: CityRequest = await req.json(); // Get data from the request body

    const cookieStore = cookies();
    const existingCity = cookieStore.get("city");

    if (existingCity) {
      return NextResponse.json(
        {
          success: false,
          error: "City cookie already exists. Use PUT to update.",
        },
        { status: 400 }
      );
    }

    cookieStore.set("city", city, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 90, // 3 months
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
    const { city }: { city?: string } = await req.json();

    const cookieStore = cookies();
    const existingCity = cookieStore.get("city");

    if (!existingCity) {
      return NextResponse.json(
        { success: false, error: "City cookie does not exist." },
        { status: 400 }
      );
    }

    if (city && existingCity.value !== city) {
      return NextResponse.json(
        {
          success: false,
          error: "City name does not match the existing cookie.",
        },
        { status: 400 }
      );
    }

    cookieStore.delete("city");

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
    const { city }: CityRequest = await req.json(); // Get data from the request body

    const cookieStore = cookies();
    const existingCity = cookieStore.get("city");

    if (!existingCity) {
      return NextResponse.json(
        {
          success: false,
          error: "City cookie does not exist. Use POST to add.",
        },
        { status: 400 }
      );
    }

    cookieStore.set("city", city, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 90, // 3 months
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
