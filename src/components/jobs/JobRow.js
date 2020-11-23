import React from "react";
import { Link } from "react-router-dom";

export default function JobRow(props) {
  const {
    id,
    title,
    required_experience_level,
    job_requirements,
    start_date,
    end_date,
  } = props.job;
  if (props.isAdmin == true) {
    return (
      <tr>
        <td>{title}</td>
        <td>{required_experience_level}</td>
        <td>{job_requirements}</td>
        <td>{start_date}</td>
        <td>{end_date}</td>
        <td>
          <Link to={{ pathname: "/job_posts/edit", state: { job: props.job } }}>
            <button>Edit</button>
          </Link>
        </td>
        <td>
          <button
            className="delete-button"
            onClick={props.deleteJob.bind(this, id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{title}</td>
        <td>{required_experience_level}</td>
        <td>{job_requirements}</td>
        <td>{start_date}</td>
        <td>{end_date}</td>
        <td>
          <Link to={{ pathname: "/job_posts/apply", state: { jobID: id } }}>
            Apply
          </Link>
        </td>
      </tr>
    );
  }
}
