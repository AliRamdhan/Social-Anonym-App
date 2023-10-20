import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

class AuthServices {
  async login(email, password) {
    try {
      const response = await axios.post(API_URL + "/auth/login", {
        User_email: email,
        User_password: password,
      });

      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.token));
        return response.data;
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle the case where the email and password are invalid
        throw new Error("Email and password are invalid");
      } else {
        // Handle other errors
        throw error;
      }
    }
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "/auth/register", {
      User_username: username,
      User_email: email,
      User_password: password,
    });
  }
}

const AuthService = new AuthServices();

export default AuthService;
