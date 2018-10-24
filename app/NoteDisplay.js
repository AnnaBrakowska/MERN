import React from "react";
import { Link } from "react-router-dom";

export const NoteDisplay = props => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="card w-75">
        <div className="card-header">{props.location.state.title}</div>
        <div className="card-body">
          <h5 className="card-title">{props.location.state.title}</h5>
          <p className="card-text">{props.location.state.text}</p>
          <Link to="/notes" className="btn btn-outline-info">
            Go back
          </Link>
        </div>
      </div>
    </div>
  );
};
