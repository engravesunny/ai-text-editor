import { http } from "../index";

export const register = (data: { username: string; password: string }) =>
  http({
    url: "/user/register",
    method: "post",
    data,
  });

export const login = (data: { username: string; password: string }) =>
  http({
    url: "/user/login",
    method: "post",
    data,
  });

export const logout = (data: { username: string }) =>
  http({
    url: "/user/login",
    method: "post",
    data,
  });
