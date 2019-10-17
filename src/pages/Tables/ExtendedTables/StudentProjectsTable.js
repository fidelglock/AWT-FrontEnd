import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import authlib from '../../../config/authlib';
import { CSVLink } from 'react-csv';


class StudentProjectsTable extends Component {
  constructor() {
    super();
    this.state = {
      package: {},
      items: [],
      isLoading: false,
      error: null
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    var options = authlib.getFetchOptions();
    fetch(global.backendURL + "studentproject", options)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then(data => {
        console.log(data);
        data.forEach(elemnt => {
          this.state.items.push(elemnt);
        });
        this.setState({ isLoading: false });
        console.log(this.state.items);
        console.log(this.state.items.length);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteItem = itemId => {
    this.setState({
      items: this.state.items.filter(item => item.id !== itemId)
    });
  };

  render() {
    // let { items, isShowingAlert } = this.state;
    return (
      <div className="card">
        <div className="header row">
          <div>
            <h4 className="title">Student Sign ups</h4>
          </div>
          <div className="float:right">
            <CSVLink data={this.state.items} filename={"studentSignup.csv"}  className="btn btn-primary">Excel Export</CSVLink>
          </div>


        </div>
        <div className="content table-responsive table-full-width">

          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Student Email</th>
                <th>Project ID</th>
                <th>Project Title</th>
                <th>Preference</th>
              </tr>
            </thead>
            <tbody>
              {this.state.items.map(item => (
                <tr key={item.ID}>
                  <td>{item.StudentID}</td>
                  <td>{item.StudentName}</td>
                  <td>{item.StudentEmail}</td>
                  <td>
                    <Link to={`/projects/${item.ProjectID}`} style={{ color: "blue" }}>
                      {item.ProjectID}
                    </Link>
                  </td>
                  <td>{item.Title}</td>
                  <td>{item.Preference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default StudentProjectsTable;
