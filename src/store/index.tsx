import { create } from "zustand";
import https from "../plugins/axios";
import { saveCookie } from "@utils";

const crudFactory = create(() => ({
  login: async (payload: any) => {
    try {
      const response = await https.post("/auth/login", payload);
      if (response.status == 201) {
        saveCookie("token", response.data.accessToken);
      }
      return response;
    } catch (err) {
      console.log(err);
    }
  },

  register: async(payload:any) => {
    try {
      const response = await https.post("/auth/register", payload);
      return response
    } catch (err) {
      console.log(err);
    }
  },

  postItem: async(url:any, data:any) => {
    try {
      const response = await https.post(url, data);
      return response;
    } catch (err) {
      console.log(err);
    }
  },

  getItem: async(url:any) => {
    try {
      const response = await https.get(url);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

}));

export default crudFactory;
