import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/v1";
const API_URL_POST = "http://localhost:5000/api/v1";
const API_URL_Cerita = "http://localhost:5000/api/v1/cerita";

class UserServices {
  getUserBoard() {
    return axios.get(API_URL + "/auth/home", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  getAllPost() {
    return axios.get(API_URL_POST + "/posts/all");
  }

  createOnePost(Post_Content, Post_User) {
    return axios.post("http://localhost:5000/api/v1/posts/create", {
      Post_Content: Post_Content,
      Post_User: Post_User,
    });
  }

  getDetailsOnePost(postId) {
    return axios.get(API_URL_POST + `/post/details/${postId}`);
  }

  getAllCommentPost(postId) {
    return axios.get(API_URL_POST + `/comments/all/${postId}`);
  }

  createCommentPost(Comment_Content, Comment_Post, Comment_User) {
    return axios.post(API_URL_POST + "/comments/create", {
      Comment_Content: Comment_Content,
      Comment_Post: Comment_Post,
      Comment_User: Comment_User,
    });
  }

  getAllRepliesComment(commentId) {
    return axios.get(API_URL_POST + `/replies/all/${commentId}`);
  }

  createRepliesComment(Reply_Content, Replies_Comments, Replies_Users) {
    return axios.post(API_URL_POST + "/replies/create", {
      Reply_Content: Reply_Content,
      Replies_Comments: Replies_Comments,
      Replies_Users: Replies_Users,
    });
  }

  getAllLikesPost(postId) {
    return axios.get(API_URL_POST + `/likes/all/${postId}`);
  }

  createLikesPost(Likes_Posts, Likes_Users) {
    return axios.post(API_URL_POST + "/likes/create", {
      Likes_Posts: Likes_Posts,
      Likes_Users: Likes_Users,
    });
  }

  getAllGenreCerita() {
    return axios.get(API_URL + "/genre/all");
  }

  getAllCeritaByGenre(genreId) {
    return axios.get(API_URL_Cerita + `/genre/cerita/${genreId}`);
  }

  createGenreCerita() {
    return axios.post(API_URL_Cerita + "/genre/create");
  }

  getAllCerita() {
    return axios.get(API_URL_Cerita + "/all");
  }

  getDetailsOneCerita(ceritaId) {
    return axios.get(API_URL_Cerita + `/all/${ceritaId}`);
  }

  createOneCerita(cerita, user, genre) {
    return axios.post(API_URL_Cerita + "/create", {
      Cerita_Content: cerita,
      Cerita_User: user,
      Cerita_Genre: genre,
    });
  }

  getAllCommentCerita(ceritaId) {
    return axios.get(API_URL_Cerita + `/comment/all/${ceritaId}`);
  }

  createCommentCerita(comment, cerita, user) {
    return axios.post(API_URL_Cerita + `/comment/create`, {
      Comment_Content: comment,
      Comment_Cerita: cerita,
      Comment_User: user,
    });
  }

  getAllLikesCerita(ceritaId) {
    return axios.get(API_URL_Cerita + `/likes/all/${ceritaId}`);
  }

  createLikesCerita() {
    return axios.post(API_URL_Cerita + "/likes/create");
  }

  getAllArticles() {
    return axios.get(API_URL + "/articles/all");
  }
}
const UserService = new UserServices();
export default UserService;
