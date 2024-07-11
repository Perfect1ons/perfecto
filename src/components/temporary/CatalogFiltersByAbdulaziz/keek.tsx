"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthComponent() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authStatus, setAuthStatus] = useState<string | null>(null);
  const router = useRouter(); // Использование роутера Next.js

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/jlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (data.success) {
        setAuthStatus("Authenticated");
        router.push("/profile"); // Перенаправление на страницу /profile
      } else {
        setAuthStatus("Failed to authenticate");
      }
    } catch (error) {
      setAuthStatus("An error occurred");
    }
  };

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/jlogin", {
        method: "GET",
      });

      const data = await response.json();

      if (data.isAuthenticated) {
        setAuthStatus("Authenticated");
      } else {
        setAuthStatus("Not authenticated");
      }
    } catch (error) {
      setAuthStatus("An error occurred");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/jlogin", {
        method: "DELETE",
      });

      const data = await response.json();
      router.push('/')
      if (data.success) {
        console.log("Not authenticated");
      } else {
        console.log("Failed to logout");
      }
    } catch (error) {
      console.log("An error occurred");
    }
  };

  return (
    <div>
      <button className="default__buttons_showMore" onClick={handleLogout}>
        Выйти из аккаунта
      </button>
      <button className="default__buttons_showMore" onClick={checkAuthStatus}>
        Статус
      </button>
      {authStatus && <p>{authStatus}</p>}
    </div>
  );
}
