//Admin dashboard file

import React from "react";
import RegisterStudents from "../Forms/RegularForms/RegisterStudents"

class RegisterStudentsPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row">            
              <RegisterStudents />            
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterStudentsPage;
