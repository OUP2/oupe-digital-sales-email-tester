export const constants = {
  BACKEND_URL:
    process.env.NODE_ENV === "production"
      ? "https://oupe-digital-sales-email-gen.herokuapp.com"
      : "http://localhost:8001",
};
