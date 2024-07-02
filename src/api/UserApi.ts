import axios from "axios";
import { UserType } from "../type/UserType";

class UserApi {
  async register(user: UserType) {
    try {
      const response = await axios
        .post("https://expense-tracker-api-ochre.vercel.app/register", user, {
          headers: { "Content-Type": "application/json" },
        })
        .catch((err) => {
          console.log(err.response.status);
          window.alert("Email já existe!");
          window.location.href = "/login";
        });

      return response;
    } catch (error: any) {
      console.log(error.status);

      window.alert("Preencha todos os campos!");
      // window.location.href = "/login";
      return console.error("Erro ao registrar uruário:", error.message);
    }
  }

  async login(user: UserType) {
    try {
      const response = await axios.post(
        "http://expense-tracker-api-ochre.vercel.app/login",
        user,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response) {
        return response;
      }
    } catch (error: any) {
      window.alert("Email/Senha Inválido!");
      window.location.href = "/login";
      return console.error("Erro ao logar com uruário:", error.message);
    }
  }
}

export default UserApi;
