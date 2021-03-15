import React from "react";
import "./EventItem.css";
import Button from "@material-ui/core/Button";

const eventItem = (props) => (
  <li key={props._id} className="event__list-item">
    <div>
      <h1>{props.title}</h1>
      <h2>{props.price}$</h2>
      <h2>{new Date(props.date).toLocaleDateString("de")}</h2>
    </div>
    <div>
      {props.userId !== props.creatorId ? (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="btn"
          onClick={() => props.onDetail(props.eventId)}
        >
          View Details
        </Button>
      ) : (
        <p>You are the Owner</p>
      )}
    </div>
  </li>
);

export default eventItem;
