import api from "./axios";

export const signup = (data) => api.post("/register", data);

export const login = (data) => api.post("/login", data);
