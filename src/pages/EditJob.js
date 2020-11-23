import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";

class EditJob extends Component {
  constructor(props) {
    super(props);
    const {
      id,
      title,
      required_experience_level,
      job_requirements,
      start_date,
      end_date,
    } = props.location.state.job;
    this.state = {
      api: this.props.baseAPI + `job_posts/${id}`,
      isUpdated: false,
      title,
      required_experience_level,
      job_requirements,
      start_date,
      end_date,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const formData = this.populateFormData();
    Axios.put(this.state.api, formData, this.getConfigObject())
      .then((res) => {
        const { success, error, payload } = res.data;
        if (error) alert(error);
        else if (success) {
          this.setState({ isUpdated: true });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  populateFormData = () => {
    const {
      title,
      required_experience_level,
      job_requirements,
      start_date,
      end_date,
    } = this.state;
    const formData = {
      title,
      required_experience_level,
      job_requirements,
      start_date,
      end_date,
    }
    return formData;
  };

  getConfigObject = () => {
    return {
      headers: {
        Authorization: "Bearer " + this.props.accessToken,
        'Content-Type': 'application/json'
      },
    };
  };

  render() {
    if (this.state.isUpdated) {
      return <h1>Updated Successfully</h1>;
    } else {
      const {
        title,
        required_experience_level,
        job_requirements,
        start_date,
        end_date,
      } = this.state;
      return (
        <div>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.onChange}
            ></input>
            <input
              type="text"
              name="required_experience_level"
              value={required_experience_level}
              onChange={this.onChange}
            ></input>
            <input
              type="text"
              name="job_requirements"
              value={job_requirements}
              onChange={this.onChange}
            ></input>
            <input
              type="date"
              name="start_date"
              value={start_date}
              onChange={this.onChange}
            ></input>
            <input
              type="date"
              name="end_date"
              value={end_date}
              onChange={this.onChange}
            ></input>

            <button type="submit">Update</button>
          </form>
        </div>
      );
    }
  }
}

export default withRouter(EditJob);
