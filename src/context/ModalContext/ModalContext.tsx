"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface IModalContext {
  modalMessage: React.ReactNode;
  isModalVisible: boolean;
  isRedirect: boolean;
  showModal: (message: React.ReactNode, redirect?: boolean) => void;
  hideModal: () => void;
}

const ModalContext = createContext<IModalContext | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalMessage, setModalMessage] = useState<React.ReactNode>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);

  const showModal = useCallback(
    (message: React.ReactNode, redirect: boolean = false) => {
      setModalMessage(message);
      setModalVisible(true);
      setIsRedirect(redirect);
    },
    []
  );

  const hideModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{ modalMessage, isModalVisible, isRedirect, showModal, hideModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): IModalContext => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
