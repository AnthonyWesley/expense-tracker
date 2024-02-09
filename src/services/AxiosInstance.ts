// import axios from "axios";

// export type TokenType = { accessToken: string; refreshToken: string };

// let authTokens: TokenType = localStorage.getItem("authTokens")
//   ? JSON.parse(localStorage.getItem("authTokens") || "")
//   : null;

// export const axiosInstance = axios.create({
//   baseURL: "https://expense-tracker-api-e91c.onrender.com/",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: authTokens?.accessToken,
//   },
// });

// axiosInstance.interceptors.request.use(async (req) => {
//   if (!authTokens) {
//     window.location.reload();
//   }
//   const response = await axios.post(
//     `https://expense-tracker-api-e91c.onrender.com/refresh`,
//     {
//       refreshToken: authTokens.refreshToken,
//     },
//     {
//       headers: {
//         Authorization: authTokens?.refreshToken,
//       },
//     }
//   );

//   if (response.status === 200) {
//     // localStorage.setItem("authTokens", JSON.stringify(response.data.token));
//     authTokens.accessToken = response.data.token.accessToken;
//     req.headers.Authorization = authTokens.accessToken;
//   }
//   return req;
// });

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if ([401, 403].includes(error.response.status)) {
//       window.alert("Email/Senha Inválido!");
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );
