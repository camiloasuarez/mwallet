import React, { createContext, useState } from 'react';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isMenuButtonVisible, setMenuButtonVisible] = useState(true); // Nuevo estado

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const hideMenuButton = () => {
    setMenuButtonVisible(false);
  };

  const showMenuButton = () => {
    setMenuButtonVisible(true);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarVisible, toggleSidebar, isMenuButtonVisible, hideMenuButton, showMenuButton }}>
      {children}
    </SidebarContext.Provider>
  );
};
