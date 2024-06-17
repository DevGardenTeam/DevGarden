import React, { createContext, useContext, useState } from 'react';

export type UserInfo = {
  username: string;
  services: { [key: string]: boolean };
} | null;

const UserContext = createContext<{ user: UserInfo; updateUser: (userInfo: React.SetStateAction<UserInfo>) => void; }>(null!);

// Provider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInfo>(null);

  // Function to update the user state
  const updateUser = (userInfo: React.SetStateAction<UserInfo>) => {
    setUser(userInfo);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => useContext(UserContext);