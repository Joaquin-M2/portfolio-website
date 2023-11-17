export default function getUserId() {
  if (typeof window !== "undefined") {
    return JSON.parse(atob(localStorage.getItem("userToken").split(".")[1]))
      .userId;
  }
}
