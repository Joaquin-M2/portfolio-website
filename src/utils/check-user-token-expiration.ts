export default function checkJwtHasExpired() {
  if (localStorage.getItem("userToken")) {
    return (
      Date.now() >
      JSON.parse(atob(localStorage.getItem("userToken").split(".")[1])).exp *
        1000
    );
  } else {
    return true;
  }
}
