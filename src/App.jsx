import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import AuthPage from "./pages/Auth";
import BookingsPage from "./pages/Bookings";
import EventsPage from "./pages/Events";
import MainNavigation from "./components/Navigation/MainNavigation";
import "./App.css";
import AuthContext from "./context/auth-context";
import { useState } from "react";

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
  return (
    <BrowserRouter basename="/Booking_Frontend">
      <AuthContext.Provider value={{ token, userId, login, logout }}>
        <MainNavigation></MainNavigation>
        <main className="main-content">
          <Switch>
            {/* Wichtig damit nur bei / auf auth gewechselt wird und nicht alles folgende ignoriert wird */}
            {token && <Redirect from="/" to="/events" exact></Redirect>}
            {token && <Redirect from="/auth" to="/events" exact></Redirect>}
            {!token && <Route path="/auth" component={AuthPage}></Route>}
            <Route path="/events" component={EventsPage}></Route>
            {token && <Route path="/bookings" component={BookingsPage}></Route>}
            {!token && <Redirect to="/auth" exact></Redirect>}
          </Switch>
        </main>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
