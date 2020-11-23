import React, { Component } from "react";
import ApplicationRow from "./ApplicationRow";

export default class ApplicationsList extends Component {
  render() {
    const { baseAPI, isAdmin, accessToken } = this.props;
    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Universty</th>
              <th>Birth date</th>
              <th>Notes</th>
              <th>CV</th>
            </tr>
          </thead>
          <tbody>
            {this.props.applications.map((application) => (
              <ApplicationRow
                baseAPI={baseAPI}
                isAdmin={isAdmin}
                accessToken={accessToken}
                key={application.id}
                application={application}
              />
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
