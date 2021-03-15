import React, { useState, useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import "./Events.css";
import AuthContext from "../context/auth-context";
import { useContext } from "react";
import EventList from "../components/Events/EventList/EventList";
import Spinner from "../components/Spinner/spinner";

const EventsPage = () => {
  const titleRef = useRef(null);
  const priceRef = useRef(null);
  const dateRef = useRef(null);
  const descriptionRef = useRef(null);
  const [creating, setCreating] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const context = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    const requestBody = {
      query: `
        query {
          events {
            _id
            title
            description
            date
            price
            creator {
              _id
              email
            }
          }
        }
      `,
    };

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
        setEvents(resData.data.events);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const confirmHandler = () => {
    const title = titleRef.current.value;
    const price = +priceRef.current.value; // converts string to number
    const date = dateRef.current.value;
    const description = descriptionRef.current.value;

    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }
    const event = {
      title,
      price,
      date,
      description,
    };
    console.log(event);

    setCreating(false);

    const requestBody = {
      query: `
        mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!){
          createEvent(eventInput: {title: $title, description: $description, price: $price, date: $date}) {
            _id
            title
            description
            date
            price
          }
        }
      `,
      variables: {
        title: title,
        description: description,
        price: price,
        date: date,
      },
    };

    fetch("http://localhost:8000/graphql", {
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
        console.log(resData);
        setEvents((prevEvents) => [
          ...prevEvents,
          ...[
            {
              _id: resData.data.createEvent._id,
              title: resData.data.createEvent.title,
              description: resData.data.createEvent.description,
              date: resData.data.createEvent.date,
              price: resData.data.createEvent.price,
              creator: {
                _id: context.userId,
              },
            },
          ],
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const cancelHandler = () => {
    setCreating(false);
    setSelectedEvent(null);
  };

  const bookEventHandler = () => {
    if (!context.token) {
      setSelectedEvent(null);
      return;
    }
    const requestBody = {
      query: `
        mutation BookEvent($eventId: ID!){
          bookEvent(eventId: $eventId) {
            _id
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        eventId: selectedEvent._id,
      },
    };

    fetch("http://localhost:8000/graphql", {
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
        console.log(resData);
        setSelectedEvent(null);
      })
      .catch((err) => {
        console.log(err);
        setSelectedEvent(null);
      });
  };

  const showDetailHandler = (eventId) => {
    setSelectedEvent(events.find((e) => e._id === eventId));
  };
  return (
    <React.Fragment>
      {context.token && (
        <div className="events-control">
          <p>Share your own Events!</p>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => setCreating(true)}
          >
            Create Event
          </Button>
        </div>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <EventList
          events={events}
          authUserId={context.userId}
          onViewDetail={showDetailHandler}
        ></EventList>
      )}

      {(creating || selectedEvent) && <Backdrop></Backdrop>}
      {creating && (
        <Modal
          title="Add Event"
          canCancel
          canConfirm
          onCancel={() => {
            cancelHandler();
          }}
          onConfirm={() => {
            confirmHandler();
          }}
          confirmText="Confirm"
        >
          <form>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" ref={titleRef}></input>
            </div>
            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input type="number" id="price" ref={priceRef}></input>
            </div>
            <div className="form-control">
              <label htmlFor="date">Date</label>
              <input type="datetime-local" id="date" ref={dateRef}></input>
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                row="4"
                ref={descriptionRef}
              ></textarea>
            </div>
          </form>
        </Modal>
      )}

      {selectedEvent && (
        <Modal
          title={selectedEvent.title}
          canCancel
          canConfirm
          onCancel={() => {
            cancelHandler();
          }}
          onConfirm={() => {
            bookEventHandler();
          }}
          confirmText={context.token ? "Book" : "Sign in to book"}
        >
          <h1>Eventname: {selectedEvent.title}</h1>
          <h2>{selectedEvent.price}$</h2>
          <h2>{new Date(selectedEvent.date).toLocaleDateString()}</h2>
          <p>{selectedEvent.description}</p>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default EventsPage;
