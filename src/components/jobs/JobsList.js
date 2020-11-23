import React, { Component } from "react";
import JobRow from "./JobRow";

export default class JobsList extends Component {
  render() {
    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Required Experience Level</th>
              <th>Job Brief</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.jobs.map((job) => (
              <JobRow key={job.id} job={job} isAdmin={this.props.isAdmin} deleteJob={this.props.deleteJob} />
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
