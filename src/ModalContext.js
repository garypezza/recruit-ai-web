// src/contexts/ModalContext.js
import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <ModalContext.Provider value={{ isOpen, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};
