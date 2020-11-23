import React, { Component } from "react";
import Axios from "axios";
import {Redirect} from 'react-router-dom';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: `${this.props.baseAPI}auth/login`,
      email: "",
      password: "",
      redirect: false,
      admin: false,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password, url } = this.state;
    Axios.post(url, { email, password })
      .then((res) => {
        const user = res.data.user;
        sessionStorage.setItem("access_token", res.data.access_token);
        sessionStorage.setItem("is_admin", user.admin);
        this.props.setAccessToken(res.data.access_token, user.admin);
        this.setState({ redirect: 1, admin: user.admin });
      })
      .catch((e) => {
        alert(e);
      });
  };

  render() {
    const jobPostsUrl = "/job_posts";
    if (this.state.redirect) {
      const redirectTo = jobPostsUrl
      return (
        <Redirect
          to={redirectTo}
        />
      );
    } else {
      return (
        <React.Fragment>
          <form className="form" onSubmit={this.onSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <button type="submit" id="login-button">
              Login
            </button>
          </form>
        </React.Fragment>
      );
    }
  }
}
