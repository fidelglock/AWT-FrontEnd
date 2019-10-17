import React, { Component } from "react";
class ContactInfo extends Component {
  state = {};
  render() {
    return (
      <div>
        <div>
          <div name="infoBox">
            <div>
              <h4>Contact Information</h4>
              <div name="imgbox">
                <div name="stephan" className="col-md-6">
                  <img src="https://cdn0.scrvt.com/fokus/1cacfe8b0d4c386b/22146d7d306c/v/c06967c8fccf/Fame_Steglich_contact.jpg" />
                  <div>
                    <p>
                      <b>Dr.-Ing. Stephan Steglich</b>
                    </p>
                    <p>
                      Director
                      <br />
                      Business Unit FAME
                    </p>
                  </div>
                </div>
                <div name="stefan" className="col-md-6">
                  <img src="https://cdn0.scrvt.com/fokus/e92f1d6d0e16efd3/d0a63db777bc/v/0da94bc15bac/arbanowski.jpg" />
                  <div>
                    <p>
                      <b>Dr.-Ing. Stefan Arbanowski</b>
                    </p>
                    <p>
                      Director
                      <br />
                      Business Unit FAME
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactInfo;