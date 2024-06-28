import { serialize } from "cookie";

interface Location {
  latitude: number;
  longitude: number;
}

export function UserLocationStorage(latitude: number, longitude: number) {
  const location: Location = { latitude, longitude };
  const serializedLocation = serialize(
    "userLocation",
    JSON.stringify(location),
    {
      httpOnly: true,
      maxAge: 3600, // expire in 1 hour (in seconds)
      path: "*/", // adjust this according to your needs
    }
  );

  document.cookie = serializedLocation;
}

export default UserLocationStorage;
