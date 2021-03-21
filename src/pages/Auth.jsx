import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import Icon from "@material-ui/core/Icon";

import "./Auth.css";
import Button from "@material-ui/core/Button";
import AuthContext from "../context/auth-context";

import Card from "../components/Card/Card";
import CardHeader from "../components/Card/CardHeader";
import CardBody from "../components/Card/CardBody";
import CardFooter from "../components/Card/CardFooter";
import cardStyle from "../assets/jss/Card/cardStyle";

import CustomInput from "../components/Input/CustomInput";
const useCardStyles = makeStyles(cardStyle);

const AuthPage = () => {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const cardClasses = useCardStyles();
  setTimeout(function () {
    setCardAnimation("");
  }, 500);

  const url =
    process.env.REACT_APP_TEST_URL ||
    "https://bookingbackendlucwag.herokuapp.com/graphql";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const context = useContext(AuthContext);
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

  return (
    <React.Fragment>
      <Card className={cardClasses[cardAnimaton]}>
        <form className={cardClasses.form} onSubmit={submitHandler}>
          <CardHeader
            color={isLoggedIn ? "primary" : "info"}
            className={cardClasses.cardHeader}
          >
            <h4>{isLoggedIn ? "Login In" : "Sign Up"}</h4>
          </CardHeader>
          <CardBody>
            <CustomInput
              labelText="Email"
              id="email"
              inputRef={emailRef}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                type: "email",
                endAdornment: (
                  <InputAdornment position="end">
                    <Email className={cardClasses.inputIconsColor} />
                  </InputAdornment>
                ),
              }}
            />
            <CustomInput
              labelText="Password"
              inputRef={passwordRef}
              id="password"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                type: "password",
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className={cardClasses.inputIconsColor}>
                      lock_outline
                    </Icon>
                  </InputAdornment>
                ),
                autoComplete: "off",
              }}
            />
          </CardBody>
          <CardFooter className={cardClasses.cardFooter}>
            <Button simple color="primary" size="lg" type="submit">
              {!isLoggedIn ? "SignUp" : "LogIn"}
            </Button>
            <Button
              simple
              color="primary"
              size="lg"
              onClick={() => {
                setIsLoggedIn((prevValue) => !prevValue);
              }}
            >
              Switch to {isLoggedIn ? "Signup" : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      {<div style={{ color: "white" }}>{responseElement}</div>}
    </React.Fragment>
  );
};

export default AuthPage;
