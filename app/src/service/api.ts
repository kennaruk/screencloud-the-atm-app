import axios from "axios";

const api = axios.create({
  baseURL: "https://frontend-challenge.screencloud-michael.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
  transformRequest: [
    (data) => {
      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    (data) => {
      return JSON.parse(data);
    },
  ],
  validateStatus: () => true,
});

export default api;
