import express from "express";
import fetch from "node-fetch";
import { spotifyApi } from "../app.js";
import User from "../models/user.js";
import Post from "../models/post.js";

// import path
import path from "path";
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
  const { name, email, password, avatar } = req.body;

  const takenEmail = await User.findOne({ email });
  if (takenEmail) {
    res.status(409).json({ message: "Email has already been used" });
  } else {
    const newUser = new User({
      name,
      email,
      password,
      avatar,
    });
    try {
      await newUser.save();
      res.status(200).json(newUser);
    } catch (error) {
      res.send(error.message);
    }
  }
});

// login router
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    if (user.password === password) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "Wrong password" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

router.post("/createPost", (req, res) => {
  const { title, content, author } = req.body;
  const newPost = new Post({
    title,
    content,
    author,
  });
  newPost.save((err, post) => {
    if (err) {
      res.send(err);
    } else {
      res.json(post);
    }
  });
});

router.get("/recommendations", (req, res) => {
  // get recommendations from spotifyApi
  spotifyApi
    .getRecommendations({
      min_energy: 0.4,
      seed_artists: ["0KJ7DiybcwyulZLILX3Z95"],
      min_popularity: 50,
      limit: 10,
    })
    .then(
      function (data) {
        let recommendations = data.body;
        res.json(recommendations);
      },
      function (err) {
        console.log("Something went wrong!", err);
      },
    );
});
export default router;
