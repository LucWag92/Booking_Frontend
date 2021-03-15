import React, { useState, useEffect } from "react";
import AuthContext from "../context/auth-context";
import { useContext } from "react";
import Spinner from "../components/Spinner/spinner";
import BookingList from "../components/Bookings/BookingList/BookingList";
import BookingChart from "../components/Bookings/BookingsChart/BookingsChart";
import Button from "@material-ui/core/Button";

import "./Bookings.css";

const BookingsPage = () => {
  const [isLoading, setisLoading] = useState(false);
  const [bookings, setbookings] = useState([]);
  const [isList, setIsList] = useState(true);
  const context = useContext(AuthContext);

  useEffect(() => {
    fetchBookings();
  }, []);

  const deleteBookingHandler = (bookingId) => {
    if (!context.token) {
      return;
    }
    setisLoading(true);
    const requestBody = {
      query: `
        mutation CancelBooking($bookingId: ID!) {
          cancelBooking(bookingId: $bookingId) {
            _id
            title
          }
        }
      `,
      variables: { bookingId: bookingId },
    };

    // fetch("http://localhost:8000/graphql", {
    fetch("https://bookingbackendlucwag.herokuapp.com:3000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Fetch Failed");
        }
        return res.json();
      })
      .then((resData) => {
        setbookings((prevBookings) => {
          const bookings = prevBookings.filter((pB) => {
            return pB._id !== bookingId;
          });
          return bookings;
        });
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };
  const fetchBookings = () => {
    if (!context.token) {
      setbookings(null);
      return;
    }
    setisLoading(true);
    const requestBody = {
      query: `
        query {
          bookings {
            _id
            createdAt
            updatedAt
            event {
              _id
              title
              date
              price
            }
            
          }
        }
      `,
    };

    // fetch("http://localhost:8000/graphql", {
    fetch("https://bookingbackendlucwag.herokuapp.com:3000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Fetch Failed");
        }
        return res.json();
      })
      .then((resData) => {
        const bookings = resData.data.bookings;
        setbookings(bookings);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
      });
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <div className="switchButtons">
            <Button
              disabled={isList}
              variant="contained"
              color="primary"
              type="submit"
              className="switchBtn"
              onClick={() => setIsList(true)}
            >
              List
            </Button>
            <Button
              disabled={!isList}
              variant="contained"
              color="primary"
              type="submit"
              className="switchBtn"
              onClick={() => setIsList(false)}
            >
              Chart
            </Button>
          </div>
          {isList ? (
            <BookingList
              bookings={bookings}
              onDelete={deleteBookingHandler}
            ></BookingList>
          ) : (
            <BookingChart bookings={bookings}></BookingChart>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default BookingsPage;
