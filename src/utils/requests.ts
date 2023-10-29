import { apiBackendUrlDomain } from "./api-backend-url-domain";

const headers = new Headers();
headers.set("Content-Type", "application/json");

export function createRequest({ urlPath, method = "GET", requestBody = null }) {
  setAuthorizationHeader(urlPath);
  return new Request(apiBackendUrlDomain + urlPath, {
    method,
    headers,
    body: method !== "GET" ? JSON.stringify(requestBody) : null,
  });
}

function setAuthorizationHeader(urlPath) {
  if (typeof window !== "undefined") {
    if (urlPath !== "/user/login" && !localStorage.getItem("userToken")) return;
    if (localStorage.getItem("userToken")) {
      headers.set(
        "Authorization",
        `Bearer ${localStorage.getItem("userToken")}`
      );
    }
  }
}
