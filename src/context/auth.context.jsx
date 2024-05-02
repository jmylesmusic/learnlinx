import React, { useState, useEffect } from "react";
const API_URL = "http://localhost:5005";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = async () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      try {
        const response = await fetch(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
          method: "GET",
        });

        if (!response.ok) throw new Error("Network response was not ok.");

        const user = await response.json();
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);
      } catch (error) {
        console.error("Error during authentication:", error);
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
