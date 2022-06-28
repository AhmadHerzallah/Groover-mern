import React, { useState } from "react";
import signUpStyle from "../../style/signup.module.css";
import { createGlobalStyle } from "styled-components";
import { ArrowLeft } from "react-feather";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Authentication/Auth";
import axios from "axios";
import MobileIllustration from "../../assets/icons/mobile_ill.svg";

const GlobalStyle = createGlobalStyle`
  .navbar {
    display: none;
  }
  html, body {
    overflow-x: hidden;
    overflow-y: hidden;
  }
`;

const Signup = () => {
  const history = useHistory();
  const [state, setState] = useState({});
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(state);
  };

  const submitAction = async (e) => {
    e.preventDefault();
    console.log("Executing...");
    console.log(state);
    let passwordRule = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})",
    );
    if (state.name === "" || state.name === undefined) {
      alert("Please fill out the name field");
    } else if (state.email === "" || state.email === undefined) {
      alert("Pleae fill out the email field");
    } else if (password === "" || password === undefined) {
      alert("Please fill out the password form");
    } else {
      await axios
        .post("http://localhost:5000/api/addUser", state)
        .then((res) => {
          if (res.status === 200) {
            alert("User created successfully");
            // save user's data in local storage
            localStorage.setItem("user", JSON.stringify(res.data));
            localStorage.setItem("auth", true);

            history.push("/profile");
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
          <Col md={7} className={signUpStyle.column__left}>
            <div className={signUpStyle.backButton}>
              <Link to="/" className={signUpStyle.backButton__Link}>
                {" "}
                <ArrowLeft style={{ marginBottom: "2px" }} />
                <p className={signUpStyle.backButton__Text}>Go back</p>
              </Link>
            </div>
            <div className={signUpStyle.signUp__Title}>
              <h2>Sign up</h2>
            </div>
            <div className={signUpStyle.social}>
              <button className={signUpStyle.social__google}>
                Continue with Google
              </button>
              <button className={signUpStyle.social__github}>
                Continue with GitHub
              </button>
            </div>
            <div className={signUpStyle.lineBreaker}>
              <p>or Sign up with Email</p>
            </div>
            <div className={signUpStyle.email__form}>
              <form onSubmit={submitAction}>
                <label htmlFor="name">Name</label>
                <br />
                <input
                  className={signUpStyle.form__input}
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleInputChange}
                  placeholder="Joe Smith"
                  autoComplete
                />
                <br />
                <label htmlFor="email">Email</label>
                <br />
                <input
                  className={signUpStyle.form__input}
                  type="text"
                  id="email"
                  name="email"
                  onChange={handleInputChange}
                  placeholder="mail@mail.com"
                />
                <br />
                <label htmlFor="password">Password</label>
                <br />
                <input
                  className={signUpStyle.form__input}
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
                  className={signUpStyle.indented__checkbox__text}
                >
                  I agree to the terms and conditions
                </label>
                <br />

                <button>Sign up</button>
              </form>
            </div>
          </Col>
          <Col>
            <div className={signUpStyle.right}>
              <div className={signUpStyle.layout}>
                <h1>Groover</h1>
                <h2 className={signUpStyle.layout__words}>
                  A few clicks away from creating your Profile
                </h2>
                <div className={signUpStyle.layout__image}>
                  <img
                    className={signUpStyle.layout__illustraion}
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

export default Signup;
