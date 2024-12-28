const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const dotenv = require("dotenv");
dotenv.config();

// Initialize the OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

// Set credentials using the refresh token
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const getAccessToken = async () => {
  try {
    const { token } = await oAuth2Client.getAccessToken();
    if (!token) {
      throw new Error("Access token is null or undefined");
    }
    return token;
  } catch (error) {
    console.error("Error retrieving access token:", error.message);
    throw new Error("Failed to retrieve access token");
  }
};
const createTransporter = async () => {
  try {
    const accessToken = await getAccessToken().token;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken,
      },
    });

    return transporter;
  } catch (error) {
    console.error("Error creating transporter:", error.message);
    throw error;
  }
};

module.exports = createTransporter;
