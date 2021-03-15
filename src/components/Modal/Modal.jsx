import React from "react";
import Button from "@material-ui/core/Button";
import "./Modal.css";
const modal = (props) => {
  return (
    <div className="modal">
      <header className="modal__header">
        <h1>{props.title}</h1>
      </header>
      <section className="modal__content">{props.children}</section>
      <section className="modal__actions">
        {props.canCancel && (
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="btn"
            onClick={() => {
              props.onCancel();
            }}
          >
            Cancel
          </Button>
        )}
        {props.canConfirm && (
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="btn"
            onClick={() => {
              props.onConfirm();
            }}
          >
            {props.confirmText}
          </Button>
        )}
      </section>
    </div>
  );
};

export default modal;
