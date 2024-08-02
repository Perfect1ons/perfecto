"use client";
import { CurrentOrdersType } from "@/types/Profile/CurrentOrders";
import { INotifications } from "@/types/Profile/Notifications/notifications";
import React, { createContext, useState, ReactNode } from "react";

interface AuthContextProps {
  orders: number;
  notif: number;
  token: string;
  userId: number;
  isAuth: boolean;
  setIsAuth: (authStatus: boolean) => void;
}

interface AuthProviderProps {
  children: ReactNode;
  notifCount?: INotifications;
  ordersCount?: CurrentOrdersType;
  isAuthed?: any;
  personId?: any;
}

export const AuthContext = createContext<AuthContextProps>({
  orders: 0,
  notif: 0,
  token: "",
  userId: 0,
  isAuth: false,
  setIsAuth: () => {},
});

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  notifCount,
  ordersCount,
  isAuthed,
  personId,
}) => {
  const [isAuth, setIsAuth] = useState(isAuthed);
  const [userId, setUserId] = useState(personId);
  const [token, setToken] = useState(isAuthed);
  const [notif, setNotif] = useState(notifCount?.length || 0);
  const [orders, setOrders] = useState(ordersCount?.items.length || 0);

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, userId, token, notif, orders }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
