"use client";
import React, { createContext, useEffect, useState } from "react";

interface AuthContextProps {
  token: string;
  userId: number;
  isAuthed: boolean;
  setIsAuthed: (authStatus: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  token: "",
  userId: 0,
  isAuthed: false,
  setIsAuthed: () => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState("");

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/auth", {
          method: "GET",
        });
        const data = await response.json()
        if (response.ok) {
          setUserId(data.userId.value);
          setToken(data.accessToken.value);
          setIsAuthed(true);
        } else {
          setIsAuthed(false);
        }
      } catch (error) {
        console.error("Ошибка при проверке авторизации:", error);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthed, setIsAuthed, userId, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
