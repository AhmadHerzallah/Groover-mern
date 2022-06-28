import React, { useState } from "react";
import logInStyle from "../../style/login.module.css";
import { createGlobalStyle } from "styled-components";
import { ArrowLeft } from "react-feather";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Authentication/Auth";
import axios from "axios";

import MobileIllustration from "../../assets/icons/mobile_ill_login.svg";

const GlobalStyle = createGlobalStyle`
  .navbar {
    display: none;
  }
  html, body {
    overflow-x: hidden;
    overflow-y: hidden;
  }
`;

const LogIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitAction = async (e) => {
    e.preventDefault();
    console.log("Executing...");
    let passwordRule = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})",
    );
    if (email === "" || email === undefined) {
      alert("Please fill out the email field");
    } else if (password === "" || password === undefined) {
      alert("Please fill out the passoword field");
    } else {
      await axios
        .post("http://localhost:5000/api/login", {
          email,
          password,
        })
        .then((res) => {
          if (res.status === 200) {
            alert("Logged in");
            // save user's data in local storage
            localStorage.setItem("user", JSON.stringify(res.data));
            localStorage.setItem("auth", true);

            history.push("/profile");
          } else if (res.status === 401) {
            alert("Wrong Password ");
          } else if (res.status === 404) {
            alert("User not found");
          } else {
            alert("User already exists");
          }
        })
        .catch((e) => {
          alert("User already exists");
        });
    }
  };

  return (
    <div className="signUpPage">
      <GlobalStyle />

      <div>
        <Row>
          <Col md={7} className={logInStyle.column__left}>
            <div className={logInStyle.backButton}>
              <Link to="/" className={logInStyle.backButton__Link}>
                {" "}
                <ArrowLeft style={{ marginBottom: "2px" }} />
                <p className={logInStyle.backButton__Text}>Go back</p>
              </Link>
            </div>
            <div className={logInStyle.signUp__Title}>
              <h2>Log in</h2>
            </div>
            <div className={logInStyle.social}>
              <button className={logInStyle.social__google}>
                Continue with Google
              </button>
              <button className={logInStyle.social__github}>
                Continue with GitHub
              </button>
            </div>
            <div className={logInStyle.lineBreaker}>
              <p>or Log in with Email</p>
            </div>
            <div className={logInStyle.email__form}>
              <form onSubmit={submitAction}>
                <label htmlFor="email">Email</label>
                <br />
                <input
                  className={logInStyle.form__input}
                  type="text"
                  id="email"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="mail@mail.com"
                />
                <br />
                <label htmlFor="password">Password</label>
                <br />
                <input
                  className={logInStyle.form__input}
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Min. 8 character"
                />
                <br />
                <input type="checkbox" name="" id="terms" />
                <label
                  htmlFor="terms"
                  className={logInStyle.indented__checkbox__text}
                >
                  I agree to the terms and conditions
                </label>
                <br />

                <button>Log in</button>
              </form>
            </div>
          </Col>
          <Col>
            <div className={logInStyle.right}>
              <div className={logInStyle.layout}>
                <h1>Groover</h1>
                <h2 className={logInStyle.layout__words}>Welcome back.</h2>
                <br />
                <div className={logInStyle.layout__image}>
                  <img
                    className={logInStyle.layout__illustraion}
                    // width={'380'}
                    src={MobileIllustration}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LogIn;
