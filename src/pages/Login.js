import React, { Component } from "react";
import LoginForm from "../components/login/LoginForm";

class Login extends Component {
  render() {
    const { setAccessToken, isAdmin } = this.props;
    return (
      <div className="wrapper">
        <div className="container">
          <h1>Career Path</h1>
          <LoginForm
            baseAPI={this.props.baseAPI}
            setAccessToken={setAccessToken}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    );
  }
}

export default Login;
