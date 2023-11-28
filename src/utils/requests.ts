import getApiBackendUrlDomain from "./api-backend-url-domain";

const headers = new Headers();
headers.set("Content-Type", "application/json");

export function createRequest({ urlPath, method = "GET", requestBody = null }) {
  setAuthorizationHeader(urlPath);
  if (requestBody === null || method === "GET") {
    return new Request(getApiBackendUrlDomain() + urlPath, {
      method,
      headers,
    });
  } else {
    return new Request(getApiBackendUrlDomain() + urlPath, {
      method,
      headers,
      body: JSON.stringify(requestBody),
    });
  }
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
