import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = Cookies.get("token")?.split(" ")[1];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/auth/register/verify",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response?.status === 200) {
          setUser(response?.data?.payload?.newUserData);
        } else {
          console.error("Error fetching user data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  const authInfo = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
