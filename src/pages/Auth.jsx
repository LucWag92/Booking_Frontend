import React, { useState, useContext } from "react";
import "./Auth.css";
import Button from "@material-ui/core/Button";
import AuthContext from "../context/auth-context";

const AuthPage = () => {
  const url =
    process.env.REACT_APP_TEST_URL ||
    "https://bookingbackendlucwag.herokuapp.com/graphql";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const context = useContext(AuthContext);
  const [isEmailActive, setEmailActive] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [isPasswordActive, setPasswordActive] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [responseElement, setResponseElement] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password);
    console.log(context);

    if (email.trim().length === 0 || password.trim().length === 0) {
      setResponseElement(<div>Check your input</div>);
      return;
    }

    let requestBody = {
      query: `
        query Login($email: String!, $password: String!){
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: email,
        password: password,
      },
    };
    if (!isLoggedIn) {
      requestBody = {
        query: `
          mutation CreateUser($email: String!, $password: String!){
            createUser(userInput: {email: $email, password: $password}) {
              _id
              email
            }
          }
        `,
        variables: {
          email: email,
          password: password,
        },
      };
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Fetch Failed");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        if (resData.data.login?.token) {
          context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
          setResponseElement(<div>{email} is successfully logged in</div>);
        } else if (resData.data.createUser?.email) {
          setResponseElement(<div>{email} was created.</div>);
        } else {
          setResponseElement(
            <div>User already exists. Please use LogIn Page</div>
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setResponseElement(<div>Error loggin in {email}</div>);
      });
  };

  const dynamicStyle = {
    backgroundColor: isLoggedIn
      ? "rgba(106, 1, 177, 0.1)"
      : "rgba(106, 1, 177, 0.3)",
  };

  const handleEMailTextChange = (text) => {
    setEmailValue(text);

    if (text !== "") {
      setEmailActive(true);
    } else {
      setEmailActive(false);
    }
  };
  const handlePasswordTextChange = (text) => {
    setPasswordValue(text);

    if (text !== "") {
      setPasswordActive(true);
    } else {
      setPasswordActive(false);
    }
  };

  return (
    <React.Fragment>
      <form className="auth-form" onSubmit={submitHandler} style={dynamicStyle}>
        <div className="form-header">
          {isLoggedIn ? "Login" : "Signup"} Modus
        </div>
        <div className="form-control">
          <div id="float-label">
            <input
              type="email"
              value={emailValue}
              onChange={(e) => {
                handleEMailTextChange(e.target.value);
              }}
              ref={emailRef}
              id="email"
            />
            <label className={isEmailActive ? "Active" : ""} htmlFor="email">
              E-mail
            </label>
          </div>
          <div id="float-label">
            <input
              type="password"
              value={passwordValue}
              onChange={(e) => {
                handlePasswordTextChange(e.target.value);
              }}
              ref={passwordRef}
              id="password"
            />
            <label
              className={isPasswordActive ? "Active" : ""}
              htmlFor="password"
            >
              Password
            </label>
          </div>
        </div>
        <div className="form-action">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={() => {
              setIsLoggedIn((prevValue) => !prevValue);
            }}
          >
            Switch to {isLoggedIn ? "Signup" : "Login"}
          </Button>
        </div>
      </form>
      {responseElement}
    </React.Fragment>
  );
};

export default AuthPage;
