import Cookies from "js-cookie";

interface Coordinates {
  latitude: number;
  longitude: number;
}

// Function to save user coordinates in cookies
export const saveUserCoordinates = (coordinates: Coordinates) => {
  Cookies.set("userCoordinates", JSON.stringify(coordinates), { expires: 1 }); // Expires in 1 day
};

// Function to get user coordinates from cookies
export const getUserCoordinates = (): Coordinates | null => {
  const cookieData = Cookies.get("userCoordinates");
  if (cookieData) {
    try {
      const coordinates = JSON.parse(cookieData) as Coordinates;
      return coordinates;
    } catch (error) {
      console.error("Error parsing user coordinates from cookies:", error);
    }
  }
  return null;
};

export const saveUserCity = (city: string) => {
  Cookies.set("userCity", city, { expires: 7 });
};
