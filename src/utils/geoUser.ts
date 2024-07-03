import Cookies from "js-cookie";

interface Coordinates {
  latitude: number;
  longitude: number;
}

// Function for saving user coordinates with encryption in cookies
export const saveUserCoordinates = (
  coordinates: Coordinates,
  secretKey?: string
) => {
  const encryptedData = encryptData(coordinates, secretKey);
  Cookies.set("userCoordinates", encryptedData, { expires: 1 }); // Истекает через 1 день
};

// Function for obtaining user coordinates with decryption from cookies
export const getUserCoordinates = (secretKey: string): Coordinates | null => {
  const encryptedData = Cookies.get("userCoordinates");
  if (encryptedData) {
    try {
      const decryptedData = decryptData(encryptedData, secretKey);
      return decryptedData as Coordinates;
    } catch (error) {
      console.error(
        "Ошибка при дешифровании координат пользователя из cookies:",
        error
      );
    }
  }
  return null;
};

// Function for data encryption
function encryptData(data: any, secretKey?: string): string {
  const encryptedData = JSON.stringify(data);
  const encryptedDataEncoded = btoa(encryptedData); // Простой пример шифрования в base64
  return encryptedDataEncoded;
}

// Function for decrypting data
function decryptData(encryptedData: string, secretKey?: string): any {
  const decryptedDataEncoded = atob(encryptedData);
  const decryptedData = JSON.parse(decryptedDataEncoded);
  return decryptedData;
}

// Usage example
export const secretKey = "cookiemaxkgKey"; // Замените на свой секретный ключ

// saving user coordinates
const userCoordinates: Coordinates = { latitude: 51.5074, longitude: -0.1278 };
saveUserCoordinates(userCoordinates, secretKey);

// example of obtaining user coordinates

// const coordinates = getUserCoordinates(secretKey)
// console.log(coordinates);
