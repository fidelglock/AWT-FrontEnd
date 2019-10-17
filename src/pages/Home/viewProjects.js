//Company dashboard file

import React from 'react';
import ProjectsTable from '../Tables/ExtendedTables/ProjectsTable';
import { Tabs, Tab } from 'react-bootstrap';

// const Dashboard = () => (
class viewProjects extends React.Component {

  constructor() {
    super()
    this.state = {
      category: [
        { id: 1, ShortName: "TV Apps" },
        { id: 2, ShortName: "Web Tech." },
        { id: 3, ShortName: "Multi Screen" },
        { id: 4, ShortName: "Artificial Intelligence" },
        { id: 5, ShortName: "Media Tech." },
        { id: 6, ShortName: "Immersive web" }
      ]
    }
  }

  //TODO use the Mount method for Dynamic stuff
  componentDidMount1() {
    this.setState({ isLoading: true });

    fetch(global.backendURL + "category")
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        else {
          throw new Error('Something went wrong ...');
        }
      })
      .then((data) => {
        this.state.category = [];
        data.forEach(elemnt => {
          this.state.category.push(elemnt)
        });
        this.setState({ isLoading: false });
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render() {
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <Tabs defaultActiveKey={1} id="plan-text-tabs">
              {this.state.category.map(item => (
                <Tab eventKey={item.id} title={item.ShortName}>
                  <ProjectsTable categoryId={item.id}/>
                </Tab>
              ))}
            </Tabs>
          </div>
        </div>
      </div >
    );
  }
}

export default viewProjects;