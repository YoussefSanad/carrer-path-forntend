import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Axios from "axios";

export default class ApplicationRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            api: this.props.baseAPI + 'applications/' + this.props.application.id + '/download_cv'
        }
    }

    downloadCV = () =>  {
        Axios.get(this.state.api, this.getConfigObject())
          .then((res) => {
            const { success, error, payload} = res.data;
            if(error) alert('s:   ' + error);
            else if(success){
              console.log(payload);
            }
          })
          .catch((err) => {
            alert(err);
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
    const {
      id,
      user_id,
      job_post_id,
      first_name,
      last_name,
      university,
      date_of_birth,
      email,
      notes,
    } = this.props.application;

    return (
      <tr>
        <td>{first_name}</td>
        <td>{last_name}</td>
        <td>{email}</td>
        <td>{university}</td>
        <td>{date_of_birth}</td>
        <td>{notes}</td>
        <td>
          <button onClick={this.downloadCV}>Download CV</button>
        </td>
      </tr>
    );
  }
}
