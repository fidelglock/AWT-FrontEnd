//Company dashboard file

import React from 'react';
import ProjectsTableDetails from '../Tables/ExtendedTables/ProjectsTableDetails';


// const Dashboard = () => (
class viewProjects extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      projectId: props.match.params.projectId,
    }
  }


  render() {
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <ProjectsTableDetails projectId={this.state.projectId} />
          </div>
        </div>
      </div >
    );
  }
}

export default viewProjects;