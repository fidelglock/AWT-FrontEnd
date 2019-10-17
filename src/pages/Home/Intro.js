import React, { Component } from "react";
class Intro extends Component {
  state = {};
  render() {
    return (
      <div>
        <div>
          <a name="content" />
          <h2>Student Projects and Theses</h2>
          <div>
            <p>
              Fraunhofer FOKUS Business Unit FAME cooperates with universities
              such as the Technische Universität Berlin, Beuth Hochschule für
              Technik Berlin and Design Akademie Berlin. We are a dynamic,
              motivated team and always on the lookout for student assistants.
              <span />
            </p>
            <p>
              You get the possibility to learn about interactive media, improve
              coding skills and establish contacts to prominent companies of the
              media industry. Additionally, we provide support for your bachelor
              or master thesis.
              <br />
              <br />
              The menu to the left helps you view and apply for the projects. We
              are looking forward to your application!
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Intro;
