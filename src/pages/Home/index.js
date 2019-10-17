import React from 'react';
import Intro from './Intro'
import MoreInfo from './MoreInfo'
import AboutFame from './AboutFame'
import ContactInfo from './ContactInfo'


class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }


  render() {
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <Intro />
            </div>
            <div className="col-md-6">
              <MoreInfo />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <AboutFame />
            </div>
            <div className="col-md-6">
              <ContactInfo />
            </div>
            <div className="col-md-6">
              <div>
                <div>
                  <div>
                    <h4>Powered By</h4>
                    <div>
                      <img src="https://www.fokus.fraunhofer.de/assets/logo-860812875da0f0aa4d5ea48e795aac93b09affdb637eae121b367da604de8737.png" />{" "}
                    </div>
                  </div>

                  <a href="https://www.fokus.fraunhofer.de/en">
                    <b>Visit our website</b>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Dashboard;
