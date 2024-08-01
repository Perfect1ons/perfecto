import { createContext, useMemo, useState } from "react";

interface UserContextProps {
  orders: number;
  notif: number;
}

export const UserContext = createContext<UserContextProps>({
  orders: 0,
  notif: 0,
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notif, setNotif] = useState(0);
  const [orders, setOrders] = useState(0);

  const contextValue = useMemo(
    () => ({
      notif,
      orders,
    }),
    [notif, orders]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
