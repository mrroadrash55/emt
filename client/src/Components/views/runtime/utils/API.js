import axios from "axios";
import { expressServerBaseURL, ownerId, mode, environment } from "./config";
import { mimeType } from "./config";


  export const authAxios = axios.create({
    withCredentials: true,
    baseURL: expressServerBaseURL,
    headers: {
      "Content-Type": "application/json",
      Mode: mode,
      Environment: environment,
    },
    responseType: "json",
  });
  export const encryptAuth = authAxios;
  