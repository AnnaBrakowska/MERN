import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Note } from "./Note";

const Info = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h3>Welcome to Awesome Notes</h3>
      <p>Please sign in to see the notes</p>
    </div>
  );
};

export const Login = props => (
  <div>
    <Info />
    <p>
      <a
        className="btn btn-outline-info btn-lg"
        href="/auth/google"
        role="button"
      >
        Sign In
      </a>
    </p>
  </div>
);
