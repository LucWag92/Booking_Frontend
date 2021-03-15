import React, { useState, useContext } from "react";
import "./Auth.css";
import Button from "@material-ui/core/Button";
import AuthContext from "../context/auth-context";

const AuthPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const context = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password);
    console.log(context);

    if (email.trim().length === 0 || password.trim().length === 0) {
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

    fetch("http://localhost:8000/graphql", {
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
        if (resData.data.login.token) {
          context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="auth-form" onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailRef} />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordRef} />
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
  );
};

export default AuthPage;
