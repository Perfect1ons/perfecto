"use client";
import React, { createContext, useEffect, useState } from "react";

interface AuthContextProps {
  isAuthed: boolean;
  setIsAuthed: (authStatus: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthed: false,
  setIsAuthed: () => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/auth", {
          method: "GET",
        });
        const data = await response.json();

        if (data.success) {
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
    <AuthContext.Provider value={{ isAuthed, setIsAuthed }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
