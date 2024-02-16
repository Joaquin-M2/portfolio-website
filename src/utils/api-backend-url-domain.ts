export default function getApiBackendUrlDomain() {
  if (typeof window !== "undefined") {
    if (window.location.hostname === "localhost") {
      return "http://localhost:4000/api/v1";
    } else {
      return "https://portfolio-website-backend.adaptable.app/api/v1";
    }
  }
}
