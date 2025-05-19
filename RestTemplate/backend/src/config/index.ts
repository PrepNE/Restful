export const port = process.env.PORT || 3000;
export const jwtSecret = process.env.JWT_SECRET || "";

export const mail = {
  host: process.env.MAIL_HOST || "",
  port: parseInt(process.env.MAIL_PORT || "1025", 10),
  from: process.env.MAIL_FROM_ADDRESS || "",
};
