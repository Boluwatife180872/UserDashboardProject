import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserDataState] = useState({});

  // Load from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserDataState(JSON.parse(storedUser));
    }
  }, []);

  // Wrapper around setUserData to also save to localStorage
  const setUserData = (data) => {
    setUserDataState(data);
    localStorage.setItem("userData", JSON.stringify(data));
  };

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
