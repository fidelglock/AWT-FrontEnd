import React, { Component } from "react";
class MoreInfo extends Component {
  state = {};
  render() {
    return (
      <div>
        <div>
          <div name="infoBox">
            <div>
              <h3>More Information</h3>
            </div>
            <div>
              For detailed information and enrolment, have a look at our course
              at TU Berlin:
            </div>
            <div>
              <img src="https://cdn0.scrvt.com/fokus/186fc3d4a4b96d26/8fa9d65bebae/v/bfc1f9503cae/fame_logo_tuberlin_400x226.png" />
              <span />
            </div>
            <div>
              <a href="https://www.ods.tu-berlin.de/menue/lehre/sommersemester/pj_advanced_web_technologies/">
                Project Advanced Web Technologies
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MoreInfo;
