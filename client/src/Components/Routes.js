import React from "react";
import { Route, Routes } from "react-router-dom";
import Grinder from "./Pages/Grinder";
// import Login from './Pages/Login';
import Login from "./Authentication/LogIn";

import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import Search from "./Pages/Search";

// Authentication
import Signup from "./Authentication/Signup";

const Routess = ({ isSignedIn, setIsSignedIn }) => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/search" exact element={<Search />} />
      <Route
        path="/login"
        exact
        element={
          <Login isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
        }
      />
      <Route
        path="/profile"
        exact
        element={
          <Profile isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
        }
      />
      <Route path="/grinder" exact element={<Grinder />} />
      <Route
        path="/signup"
        exact
        element={
          <Signup isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
        }
      />
    </Routes>
  );
};

export default Routess;
