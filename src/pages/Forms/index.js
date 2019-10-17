import React from 'react';
import { Route } from 'react-router-dom';
import RegularForms from './RegularForms';
import ExtendedForms from './ExtendedForms';
import ValidationForms from './ValidationForms';

const Forms = ({match}) => (
  <div className="content">
    <div className="container-fluid">
      <Route path={`${match.url}/regular-forms`} component={RegularForms} />
      <Route path={`${match.url}/extended-forms`} component={ExtendedForms} />
    </div>
  </div>
);

export default Forms;