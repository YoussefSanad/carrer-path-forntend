import React from "react";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      api: this.props.baseAPI + "auth/logout",
    };
  }

  getConfigObject = () => {
    return {
      headers: {
        Authorization: "Bearer " + this.props.accessToken,
      },
    };
  };

  onClick = (e) => {
    Axios.post(this.state.api, null, this.props.config);
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("is_admin");
    this.props.setAccessToken("", "");
  };

  render() {
    const { accessToken, isAdmin } = this.props;
    if (!accessToken) {
      return <Redirect to="/login" />;
    } else if (accessToken) {
      if (isAdmin == true) {
        return (
          <header>
            <Link to={"/job_posts"}>Job Posts</Link> |{" "}
            <Link to={"/admin/applications"}>Applications</Link> |{" "}
            <button onClick={this.onClick}>Sign Out</button>
          </header>
        );
      } else {
        return (
          <header>
            <Link to={"/job_posts"}>Job Posts</Link> |{" "}
            <button onClick={this.onClick}>Sign Out</button>
          </header>
        );
      }
    } else {
      return (
        <header>
          <Link to={"/login"}>Login</Link> |{" "}
        </header>
      );
    }
  }
}
