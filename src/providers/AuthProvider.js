import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const userToken = Cookies.get("token")?.split(" ")[1];
  const adminToken = Cookies.get("token")?.split(" ")[1];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/user/auth/register/verify",
          {
            headers: {
              Authorization: userToken,
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

    if (userToken) {
      fetchUserData();
    }
  }, [userToken]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/admin/auth/login/verify",
          {
            headers: {
              Authorization: adminToken,
            },
          }
        );
        if (response?.status === 200) {
          setAdmin(response?.data?.payload?.newAdminData);
        } else {
          console.error("Error fetching admin data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error.message);
      }
    };

    if (adminToken) {
      fetchAdminData();
    }
  }, [adminToken]);
  console.log(admin, user);
  const authInfo = {
    user,
    admin,
    setUser,
    setAdmin,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
