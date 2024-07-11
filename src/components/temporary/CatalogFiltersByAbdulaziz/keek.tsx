"use client";
import { useState } from "react";

export default function AuthComponent() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authStatus, setAuthStatus] = useState<string | null>(null);

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

      if (data.success) {
        setAuthStatus("Not authenticated");
      } else {
        setAuthStatus("Failed to logout");
      }
    } catch (error) {
      setAuthStatus("An error occurred");
    }
  };

  return (
    <div>
      <h1>Authentication</h1>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter your phone number"
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={checkAuthStatus}>Check Auth Status</button>
      <button onClick={handleLogout}>Logout</button>
      {authStatus && <p>{authStatus}</p>}
    </div>
  );
}
