import axios from "axios";
import { useState, useEffect } from "react";

export default function useAxios() {
  const [loading, setLoading] = useState(false);

  const [authTokens, setAuthTokens] = useState({
    accessToken: "",
    refreshToken: "",
  });

  const axiosInstance = axios.create({
    baseURL: "http://expense-tracker-api-ochre.vercel.app/",
    headers: {
      "Content-Type": "application/json",
      Authorization: authTokens.accessToken,
    },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://expense-tracker-api-ochre.vercel.app/refresh",
        {
          refreshToken: authTokens.refreshToken,
        },
        {
          headers: {
            Authorization: authTokens.refreshToken,
          },
        }
      );

      if (response.status === 200) {
        const newAccessToken = response.data.token.accessToken;
        setAuthTokens({
          ...authTokens,
          accessToken: newAccessToken,
        });
        req.headers.Authorization = newAccessToken;
      }
    } catch (error) {
      console.error(error);
    }

    return req;
  });

  axiosInstance.interceptors.response.use(
    (res) => {
      setLoading(false);
      return res;
    },
    (error) => {
      if ([401, 403, 500].includes(error.response.status)) {
        window.alert("Email/Senha Inválido!");
        localStorage.removeItem("authTokens");
        window.location.href = "/login";
      }
      if (error.response.status === 404) setLoading(false);
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const storedTokens = localStorage.getItem("authTokens");
    if (storedTokens) {
      setAuthTokens(JSON.parse(storedTokens));
    }
  }, []);

  return { loading, axiosInstance, authTokens, setAuthTokens, setLoading };
}
