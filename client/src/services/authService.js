import axios from "axios";

import {
  API_BASE_URL,
  AUTH_ENDPOINTS,
} from "../utils/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type":
      "application/json",
  },
});

export const registerUser =
  async (userData) => {
    const response =
      await api.post(
        AUTH_ENDPOINTS.REGISTER,
        userData
      );

    return response.data;
  };

export const loginUser =
  async (userData) => {
    const response =
      await api.post(
        AUTH_ENDPOINTS.LOGIN,
        userData
      );

    return response.data;
  };

export default api;