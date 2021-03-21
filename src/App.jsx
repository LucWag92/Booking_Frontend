import { Route, Redirect, Switch, HashRouter } from "react-router-dom";
import AuthPage from "./pages/Auth";
import BookingsPage from "./pages/Bookings";
import EventsPage from "./pages/Events";
import "./App.css";
import AuthContext from "./context/auth-context";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "./components/Navigation/Header";
import HeaderLinks from "./components/Navigation/HeaderLinks";
import image from "./assets/img/events.jpg";
import backgroundStyle from "./assets/jss/backgroundStyle";

import Footer from "./components/Footer/Footer.js";

const useBackgroundStyles = makeStyles(backgroundStyle);

function App() {
  const [token, settoken] = useState("");
  const [userId, setuserId] = useState("");
  const login = (tokenFc, userIdFc, tokenExpiration) => {
    settoken(tokenFc);
    setuserId(userIdFc);
  };
  const logout = () => {
    settoken("");
    setuserId("");
  };

  const backGroundClasses = useBackgroundStyles();

  return (
    <HashRouter>
      <AuthContext.Provider value={{ token, userId, login, logout }}>
        <div
          className={backGroundClasses.background}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <Header
            color="transparent"
            brand="Booking Prototype"
            rightLinks={<HeaderLinks />}
          />
          <main className="main-content">
            <Switch>
              {/* Wichtig damit nur bei / auf auth gewechselt wird und nicht alles folgende ignoriert wird */}
              {token && <Redirect from="/" to="/events" exact></Redirect>}
              {token && <Redirect from="/auth" to="/events" exact></Redirect>}
              {!token && <Route path="/auth" component={AuthPage}></Route>}
              <Route path="/events" component={EventsPage}></Route>
              {token && (
                <Route path="/bookings" component={BookingsPage}></Route>
              )}
              {!token && <Redirect to="/auth" exact></Redirect>}
            </Switch>
          </main>
          <Footer whiteFont />
        </div>
      </AuthContext.Provider>
    </HashRouter>
  );
}

export default App;
