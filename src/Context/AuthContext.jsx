import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider  ({ children }) {
  const [isLoggedIn, setIsLogged] = useState(false);
  const login = () => {
    setIsLogged(true);
  };
  const logout = () => {
    setIsLogged(false);
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};





