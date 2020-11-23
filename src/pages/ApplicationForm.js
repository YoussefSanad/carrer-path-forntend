import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";

class ApplicationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: this.props.baseAPI + "applications",
      firstName: '',
      lastName: '',
      university: '',
      dateOfBirth: '',
      email: '',
      cv: '',
      notes: '',
      applied: false,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const formData = this.populateFormData();
    Axios.post(this.state.api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + this.props.accessToken,
      },
    })
      .then((res) => {
        const { success, error, payload} = res.data;
        if(error) alert(error);
        else if(success){
          console.log(payload);
          this.setState({ applied: true });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  populateFormData = () => {
    const { location } = this.props;
    const {
      firstName,
      lastName,
      university,
      dateOfBirth,
      email,
      notes,
    } = this.state;
    const formData = new FormData();
    const cv = document.querySelector("#file");
    formData.append("cv", cv.files[0]);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("university_name", university);
    formData.append("date_of_birth", dateOfBirth);
    formData.append("email", email);
    formData.append("notes", notes);
    formData.append("job_post_id", location.state.jobID);
    return formData;
  };

  render() {
    if (this.state.applied) {
      return <h1>Applied Successfully</h1>;
    } else {
      const {
        firstName,
        lastName,
        university,
        dateOfBirth,
        email,
        notes,
      } = this.state;
      return (
        <div>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={this.onChange}
            ></input>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={this.onChange}
            ></input>
            <input
              type="text"
              name="university"
              value={university}
              onChange={this.onChange}
            ></input>
            <input
              type="date"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={this.onChange}
            ></input>
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.onChange}
            ></input>
            <input type="file" id="file" name="file"></input>
            <textarea
              type="text"
              name="notes"
              value={notes}
              onChange={this.onChange}
            ></textarea>
            <button type="submit">Apply</button>
          </form>
        </div>
      );
    }
  }
}

export default withRouter(ApplicationForm);
