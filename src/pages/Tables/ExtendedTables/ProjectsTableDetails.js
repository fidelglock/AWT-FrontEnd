import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class ProjectsTableDetails extends Component {

  constructor(props) {
    super(props)
    this.state = {
      projects: [],
      isLoading: false,
      error: null,
      projectId: this.props.projectId
    }
  }


  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(global.backendURL + "projects/" + this.props.projectId)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        else {
          throw new Error('Something went wrong ...');
        }
      })
      .then((data) => {
        data.forEach(elemnt => {
          this.state.projects.push(elemnt)
        });
        this.setState({ isLoading: false });
      })
      .catch(function (error) {
        console.log(error)
      })
  }


  deleteItem = itemId => {
    this.setState({
      items: this.state.items.filter(item => item.id !== itemId)
    });
  }

  render() {
    //let project = this.state.projects[0];
    return (
      <div className="card">
        {this.state.projects.map(project => (
          <div>
            <div className="header">
              <h2 className="title">{project.Title}</h2>
            </div>
            <div className="content table-responsive table-full-width">
              <h4>Description</h4>
              {project.Description}

              <h4>Pre-Requisites</h4>
              {project.Prereq}

              <h4>Maximum Students: {project.MaxStudent}</h4>
            </div>
          </div>
        ))}

      </div>
    )
  }
}

export default ProjectsTableDetails;