import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

const style = {
  margin: "0 auto"
};

export class NewNote extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const handleClick = event => {
      event.preventDefault();
      console.log(event);
      console.log(event.target);
      console.log(this.props);
      let note = {
        title: this.refs.title.value,
        text: this.refs.text.value
      };
      this.props.saveNoteHandler(note);
    };
    return this.props.redirect === true ? (
      <Redirect to="/notes" />
    ) : (
      <div>
        <Home />
        <div style={style} className="card w-75">
          <h1 className="card-header">Create a new note</h1>
          <div className="card-body">
            <form>
              <div className="form-group">
                <h5 className="card-title">Title</h5>
                <input
                  type="text"
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Title..."
                  value={this.props.title}
                  onChange={this.props.onChangeTitleHandler}
                />
              </div>

              <div className="form-group">
                <h5 className="card-title">Text</h5>
                <textarea
                  type="text"
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Text..."
                  value={this.props.text}
                  onChange={this.props.onChangeTextHandler}
                />
              </div>
              <Link
                to={"/notes"}
                onClick={this.props.saveNoteHandler}
                className="btn btn-outline-info"
              >
                Save
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const Home = props => {
  return (
    <Link
      to={"/notes"}
      onClick={props.homeButtonHandler}
      className="btn btn-outline-info btn-lg"
    >
      Home
    </Link>
  );
};
