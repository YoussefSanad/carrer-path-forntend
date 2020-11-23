import React, { Component } from "react";
import Axios from "axios";
import ApplicationsList from "../components/applications/ApplicationsList";

export default class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationsAPI: this.props.baseAPI + "applications",
      applications: [],
      loading: true,
    };
  }

  componentDidMount() {
    Axios.get(this.state.applicationsAPI, this.getConfigObject())
      .then((res) => {
        this.setState({
          applications: res.data.payload,
          loading: false,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getConfigObject = () => {
    return {
      headers: {
        Authorization: "Bearer " + this.props.accessToken,
      },
    };
  };

  render() {
    if (this.state.loading) return <div className="loading">loading...</div>;
    else {
      const { baseAPI, isAdmin, accessToken } = this.props;
      return (
        <div className="container">
          <ApplicationsList
            applications={this.state.applications}
            baseAPI={baseAPI}
            isAdmin={isAdmin}
            accessToken={accessToken}
          ></ApplicationsList>
        </div>
      );
    }
  }
}
