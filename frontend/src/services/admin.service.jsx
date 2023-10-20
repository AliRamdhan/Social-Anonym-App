import axios from "axios";
import authHeader from "./auth-header";

const API_URL_USER = "http://localhost:5000/api/v1";
const API_URL_Artikel = "http://localhost:5000/api/v1/articles";
const API_URL_Genre = "http://localhost:5000/api/v1/genre";

class AdminServices {
  getAdminBoard() {
    return axios.get(API_URL_USER + "/auth/admin/home", {
      headers: authHeader(),
    });
  }
  getAllArticles() {
    return axios.get(API_URL_Artikel + "/all");
  }

  getDetailsArticles(articleId) {
    return axios.get(API_URL_Artikel + `/${articleId}`);
  }

  async createArticles(title, content, user, picture) {
    const form = new FormData();
    form.append("Artikel_User", user);
    form.append("Artikel_Title", title);
    form.append("Artikel_Content", content);
    form.append("Artikel_Picture", picture);
    try {
      const response = axios.post(API_URL_Artikel + "/create", form);
      return response;
    } catch (error) {
      return error.message;
    }
  }

  async updateArticles(articleId, title, content, picture) {
    const form = new FormData();
    form.append("Artikel_Title", title);
    form.append("Artikel_Content", content);
    form.append("Artikel_Picture", picture);
    try {
      const response = await axios.put(
        API_URL_Artikel + `/update/${articleId}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }

  deleteArticles(articleId) {
    return axios.delete(API_URL_Artikel + `/delete/${articleId}`);
  }

  getAllGenreCerita() {
    return axios.get(API_URL_Genre + "/all");
  }

  getDetailsGenres(genreId) {
    return axios.get(API_URL_Genre + `/${genreId}`);
  }

  createGenreCerita(genre) {
    return axios.post(API_URL_Genre + "/create", {
      Genre_Cerita: genre,
    });
  }

  updateGenreCerita(genreId, genre) {
    return axios.put(API_URL_Genre + `/edit/${genreId}`, {
      Genre_Cerita: genre,
    });
  }

  deleteGenreCerita(genreId) {
    return axios.delete(API_URL_Genre + `/delete/${genreId}`);
  }
}
const AdminService = new AdminServices();
export default AdminService;
