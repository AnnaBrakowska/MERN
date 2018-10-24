const React = require("react");
const ReactDom = require("react-dom");
require("./main.css");
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";

import { Login, Logoutbut } from "./Login";
import { Note } from "./Note";
import { NewNote } from "./NewNote";
import { Logout } from "./Logout";
import { NoteDisplay } from "./NoteDisplay";

const style = {
  fontFamily: "Chalkduster, fantasy",
  fontSize: "4em",
  textAlign: "center",
  marginBottom: "50px"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      notes: [],
      isLogged: false,
      homeButtonClicked: false,
      redirect: false,
      title: "",
      text: ""
    };
    this.homeButtonHandler = this.homeButtonHandler.bind(this);
    this.saveNoteHandler = this.saveNoteHandler.bind(this);
    this.removeNoteHandler = this.removeNoteHandler.bind(this);
    this.onChangeTitleHandler = this.onChangeTitleHandler.bind(this);
    this.onChangeTextHandler = this.onChangeTextHandler.bind(this);
  }
  componentDidMount() {
    fetch("/api/current_user")
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({ user: data, isLogged: true });
        fetch("http://localhost:3000/notes")
          .then(notes => {
            console.log("after then");
            return notes.json();
          })
          .then(notes => {
            console.log("HERE SHOULD BE SOME NOTES:", notes);
            this.setState({ notes: notes });
          });
      });
  }

  logoutHandler() {
    this.setState({ user: {}, isLogged: false });
    console.log("You are logged out");
  }

  homeButtonHandler() {
    this.setState({ homeButtonClicked: !this.state.homeButtonClicked });
  }

  removeNoteHandler(id) {
    let sliced = this.state.notes.filter(el => {
      return el._id != id;
    });

    // this.state.notes.slice(0, this.state.notes.length - 1);

    this.setState({ notes: sliced });
    return fetch("http://localhost:3000/notes/" + id, {
      method: "delete"
    }).then(response =>
      response.json().then(json => {
        return json;
      })
    );
  }
  onChangeTitleHandler(event) {
    this.setState({ title: event.target.value });
  }
  onChangeTextHandler(event) {
    this.setState({ text: event.target.value });
  }

  saveNoteHandler() {
    console.log("clicked");
    console.log(event);
    fetch("http://localhost:3000/notes/new", {
      method: "POST",
      // mode: 'CORS',
      body: JSON.stringify({
        author_id: this.state.user._id,
        title: this.state.title,
        text: this.state.text
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        fetch("http://localhost:3000/notes")
          .then(notes => {
            console.log("after then");
            return notes.json();
          })
          .then(notes => {
            console.log("HERE SHOULD BE SOME NOTES:", notes);
            this.setState({ notes: notes, redirect: !this.state.redirect });
          });
      })
      .catch(err => err);
  }

  render() {
    console.log("Render: ", this.state.notes);
    return (
      <div>
        <div className="jumbotron" style={style}>
          Awesome Notes
        </div>

        <div style={{ textAlign: "center" }}>
          {this.state.isLogged ? (
            <BrowserRouter>
              <Switch>
                <Route exact={true} path="/" component={Login} />
                <Route
                  exact={true}
                  path="/notes"
                  render={arr => (
                    <Note
                      notes={this.state.notes}
                      removeNoteHandler={this.removeNoteHandler}
                    />
                  )}
                />
                <Route
                  exact={true}
                  path="/notes/new"
                  render={saveNoteHandler => (
                    <NewNote
                      saveNoteHandler={this.saveNoteHandler}
                      onChangeTextHandler={this.onChangeTextHandler}
                      onChangeTitleHandler={this.onChangeTitleHandler}
                      redirect={this.state.redirect}
                      title={this.state.title}
                      text={this.state.text}
                    />
                  )}
                />
                <Route exact={true} path="/notes/:id" component={NoteDisplay} />
                <Route exact={true} path="/api/logout" component={Logout} />
              </Switch>
            </BrowserRouter>
          ) : (
            <div>
              <Login />
            </div>
          )}
        </div>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("root"));
