import React from "react";
import { Link } from "react-router-dom";

const style = {
  margin: "1%"
};
const container = {
  justifyContent: "center",
  display: "flex",
  flexWrap: "wrap"
};

export const Note = props => {
  console.log("Props from note ", props.removeNoteHandler);
  let notes = props.notes.map(el => {
    console.log(el);
    return (
      <div style={style} key={el._id} className="card w-25">
        <h5 className="card-header">{el.title}</h5>
        <div className="card-body">
          <p className="card-text">{el.text}</p>
          <Link
            to={{
              pathname: `/notes/ + ${el._id}`,
              state: {
                title: el.title,
                text: el.text
              }
            }}
            className="btn btn-outline-info"
          >
            Read more
          </Link>
          <button
            onClick={id => props.removeNoteHandler(el._id)}
            className="btn btn-outline-info"
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  return (
    <div>
      <Logoutbut />
      <div style={container}>{notes}</div>
    </div>
  );
};

const Logoutbut = () => {
  return (
    <div>
      <a
        href="/api/logout"
        className="btn btn-outline-info btn-lg"
        role="button"
      >
        Log Out
      </a>
      <Link to="/notes/new" className="btn btn-outline-info btn-lg">
        Create New Note
      </Link>
    </div>
  );
};
