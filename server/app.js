import express from "express";
import createError from "http-errors";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import SpotifyWebApi from "spotify-web-api-node";
import Routes from "./routes/api.route.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(cors());

app.use(morgan("dev"));
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});
function newToken() {
  spotifyApi
    .clientCredentialsGrant()
    .then((data) => {
      console.log(data.body);
      spotifyApi.setAccessToken(data.body["access_token"]);
    })
    .catch((error) => {
      console.log(
        "Something went wrong when retrieving an access token",
        error,
      );
    });
}

newToken();

let tokenRefreshInterval = setInterval(newToken, 1000 * 60 * 60);

app.get("/", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻" });
});

app.use("/api", Routes);
app.use("/avatar", express.static(path.join(__dirname, "avatars")));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.URI).then(() => {
  console.log("connected to mongo");
  app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
});
