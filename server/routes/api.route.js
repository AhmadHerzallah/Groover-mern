import express from "express";
import fetch from "node-fetch";
import { spotifyApi } from "../app.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

router.get("/searchTrack", async (req, res) => {
  console.log("track is", req.query.track);
  spotifyApi
    .searchTracks(req.query.track, { limit: 10 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("The error while searching artists occurred: ", err);
    });
});

router.get("/searchArtist", async (req, res) => {
  console.log("artist is", req.query.artist);
  spotifyApi
    .searchArtists(req.query.artist, { limit: 10 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("The error while searching artists occurred: ", err);
    });
});

export default router;
