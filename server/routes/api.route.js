import express from "express";
import fetch from "node-fetch";
import { spotifyApi } from "../app.js";
import User from "../models/user.js";
// import fs
import fs from "fs";
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

router.get("/avatar", async (req, res) => {
  const id = req.query.id;
  const avatar = `../avatars/${id}.png`;
  // res.sendFile(avatar, { root: "." });
  fs.readFile(avatar, `base64`, (err, base64Image) => {
    const dataUrl = `data:image/jpeg;base64, ${base64Image}`;
    return res.send(`<img src=${dataUrl}>`);
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

router.post("/addUser", async (req, res) => {
  const { name, email, password } = req.body;

  const takenEmail = await User.findOne({ email });
  if (takenEmail) {
    res.status(409).json({ message: "Email has already been used" });
  } else {
    const newUser = new User({
      name,
      email,
      password,
    });
    try {
      await newUser.save();
      res.status(200).json(newUser);
    } catch (error) {
      res.send(error.message);
    }
  }
});

export default router;
