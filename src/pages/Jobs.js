import React, { Component } from "react";
import Axios from "axios";
import {Link} from 'react-router-dom';
import JobsList from "../components/jobs/JobsList";
export default class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsAPI: this.props.baseAPI + "job_posts",
      user: {},
      jobs: [],
      loading: true,
    };
  }

  componentDidMount() {
    Axios.get(this.state.jobsAPI, this.getConfigObject())
      .then((res) => {
        this.setState({
          jobs: res.data.payload,
          loading: false,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteJob = (id) => {
    Axios.delete(this.state.jobsAPI + `/${id}`, this.getConfigObject())
      .then((res) => {
        const jobs = this.state.jobs.filter((job) => job.id !== id);
        this.setState({jobs});
        console.log(res.data.payload);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
      if(this.props.isAdmin == true)
      {
        return (
          <div className="container">
            <JobsList
              jobs={this.state.jobs}
              isAdmin={this.props.isAdmin}
              deleteJob={this.deleteJob}
            ></JobsList>
            <Link to='/job_posts/create'> <button>Create Job</button></Link>
          </div>
        );
      }
      else{
        return <div className="container">
            <JobsList
              jobs={this.state.jobs}
              isAdmin={this.props.isAdmin}
              deleteJob={this.deleteJob}
            ></JobsList>
          </div>
      }
      
    }
  }
}
