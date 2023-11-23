export default function getUserTokenData(propertyToRetrieve) {
  if (typeof window !== "undefined") {
    switch (propertyToRetrieve) {
      case "userId":
        return JSON.parse(atob(localStorage.getItem("userToken").split(".")[1]))
          .userId;
      case "role":
        if (localStorage.getItem("userToken")) {
          return JSON.parse(
            atob(localStorage.getItem("userToken").split(".")[1])
          ).role;
        }
    }
  }
}
