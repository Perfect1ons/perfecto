"use client";
import { IBasketItems } from "@/interfaces/baskets/basket";
import { updateCartFromLocalStorage } from "@/store/reducers/cart.reducer";
import { CurrentOrdersType } from "@/types/Profile/CurrentOrders";
import { INotifications } from "@/types/Profile/Notifications/notifications";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

interface AuthContextProps {
  orders: number;
  notif: number;
  token: string;
  userId: number;
  isAuth: boolean;
  setIsAuth: (authStatus: boolean) => void;
  cartId: any;
  cartCount: IBasketItems[];
}

interface AuthProviderProps {
  children: ReactNode;
  notifCount?: INotifications;
  ordersCount?: CurrentOrdersType;
  isAuthed?: any;
  personId?: any;
  cartId?: any;
  cartData?: IBasketItems[];
}

export const AuthContext = createContext<AuthContextProps>({
  orders: 0,
  notif: 0,
  token: "",
  userId: 0,
  isAuth: false,
  setIsAuth: () => {},
  cartId: null,
  cartCount: [],
});

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  notifCount,
  ordersCount,
  isAuthed,
  personId,
  cartId: idCart,
  cartData = [],
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(isAuthed || false);
  const [cartCount, setCartCount] = useState<any[]>(cartData);
  const [cartId, setCartId] = useState<any>(idCart || null);
  const [userId, setUserId] = useState<number>(personId || 0);
  const [token, setToken] = useState<string>(isAuthed || "");
  const [notif, setNotif] = useState<number>(notifCount?.length || 0);
  const [orders, setOrders] = useState<number>(ordersCount?.items.length || 0);
 const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateCartFromLocalStorage(cartCount));
  }, [cartCount, dispatch]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        userId,
        token,
        notif,
        orders,
        cartId,
        cartCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
