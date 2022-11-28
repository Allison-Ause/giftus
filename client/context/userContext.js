// userContext and Provider will go here.

import { createContext, useContext, useState } from 'react';
import { getUser } from '../services/user-utils.js';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const currentUser = getUser();
  const [user, setUser] = useState(currentUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      'useUserContext must be used within a UserProvider'
    );
  }
  return context;
};

export { UserProvider, useUser };
