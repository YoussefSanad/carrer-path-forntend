import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Applications from "./pages/Applications";
import Jobs from "./pages/Jobs";
import ApplicationForm from "./pages/ApplicationForm";
import EditJob from "./pages/EditJob";
import CreateJob from "./pages/CreateJob";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseAPI: "http://career.test/api/",
      accessToken: sessionStorage.getItem("access_token")
        ? sessionStorage.getItem("access_token")
        : "",
      isAdmin: sessionStorage.getItem("is_admin")
        ? sessionStorage.getItem("is_admin")
        : "0",
    };
  }

  setAccessToken = (accessToken, isAdmin) => {
    this.setState({ accessToken, isAdmin });
  };

  render() {
    const { baseAPI, accessToken, isAdmin } = this.state;
    return (
      <div className="wrapper">
        <Router>
          <Header
            baseAPI={baseAPI}
            accessToken={accessToken}
            isAdmin={isAdmin}
            setAccessToken={this.setAccessToken}
          ></Header>
          <Switch>
            <Route
              path="/login"
              render={(props) => (
                <React.Fragment>
                  <Login
                    baseAPI={baseAPI}
                    setAccessToken={this.setAccessToken}
                  />
                </React.Fragment>
              )}
            ></Route>
            <Route
              exact
              path="/job_posts"
              render={() => (
                <React.Fragment>
                  <Jobs
                    baseAPI={baseAPI}
                    accessToken={accessToken}
                    isAdmin={isAdmin}
                  />
                </React.Fragment>
              )}
            ></Route>
            <Route
              exact
              path="/job_posts/apply"
              render={(props) => (
                <React.Fragment>
                  <ApplicationForm
                    baseAPI={baseAPI}
                    isAdmin={isAdmin}
                    accessToken={accessToken}
                  />
                </React.Fragment>
              )}
            ></Route>
            <Route
              path="/admin/applications"
              render={(props) => (
                <React.Fragment>
                  <Applications
                    baseAPI={baseAPI}
                    isAdmin={isAdmin}
                    accessToken={accessToken}
                  />
                </React.Fragment>
              )}
            ></Route>
            <Route
              exact
              path="/job_posts/edit"
              render={(props) => (
                <React.Fragment>
                  <EditJob
                    baseAPI={baseAPI}
                    isAdmin={isAdmin}
                    accessToken={accessToken}
                  />
                </React.Fragment>
              )}
            ></Route>
            <Route
              exact
              path="/job_posts/create"
              render={(props) => (
                <React.Fragment>
                  <CreateJob
                    baseAPI={baseAPI}
                    isAdmin={isAdmin}
                    accessToken={accessToken}
                  />
                </React.Fragment>
              )}
            ></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
