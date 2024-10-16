import axios from "axios";
import { BaseURL } from "./Api";
import Cookie from "cookie-universal";

const cookie = Cookie();
const token = cookie.get("e-commerce");

export const Axios = axios.create({
  baseURL: BaseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
