import axios from "axios";

export const api = axios.create({
  baseURL: "https://cruz-comment.herokuapp.com",
  Accept: "application/json",
});
