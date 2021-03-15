import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavigation.css';
import AuthContext from '../../context/auth-context';
import { useContext } from 'react';

const MainNavigation = () => {
  const context = useContext(AuthContext);
  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <h1>BookingApp</h1>
      </div>
      <nav className="main-navigation__items">
        <ul>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          {context.token && (
            <React.Fragment>
              <li>
                <NavLink to="/bookings">Bookings</NavLink>
              </li>
              <li>
                <button
                  onClick={() => context.logout()}
                  className="LogOutButton"
                >
                  Logout
                </button>
              </li>
            </React.Fragment>
          )}
          {!context.token && (
            <li>
              <NavLink to="/auth">Authentication</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
