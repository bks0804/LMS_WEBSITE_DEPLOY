import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const useUser = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [getNewQuery, setGetNewQuery] = useState([]);

  const name = "braj";

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        // console.log(error)
      });
  }, ["/"]);
  return (
    <AppContext.Provider
      value={{ name, user, setUser, getNewQuery, setGetNewQuery }}
    >
      {children}
    </AppContext.Provider>
  );
};
