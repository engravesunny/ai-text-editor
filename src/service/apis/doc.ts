import { http } from "..";

export const translate2English = (data: { input: string }, onDownloadProgress: (progressEvent: any) => void) =>
  http({
    method: "post",
    url: "/text/translate2English",
    data,
    onDownloadProgress,
  });

export const continueWrite = (data: { input: string }, onDownloadProgress: (progressEvent: any) => void) =>
  http({
    method: "post",
    url: "/text/continue",
    data,
    onDownloadProgress,
  });

export const summary = (data: { input: string }, onDownloadProgress: (progressEvent: any) => void) =>
  http({
    method: "post",
    url: "/text/summary",
    data,
    onDownloadProgress,
  });

export const save = (data: {
  id: string | null;
  title: string;
  content: string;
}) =>
  http({
    method: "post",
    url: "/text/save",
    data,
  });

export const apiDoclist = () =>
  http({
    method: "post",
    url: "/text/list",
  });
