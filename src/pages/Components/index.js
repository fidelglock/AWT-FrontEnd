import React from 'react';
import { Route } from 'react-router-dom';
import Buttons from './Buttons';
import Grid from './Grid';
import Icons from './Icons';


const Components = ({match}) => (
  <div className="content">
    <Route path={`${match.url}/buttons`} component={Buttons} />
    <Route path={`${match.url}/grid`} component={Grid} />
    <Route path={`${match.url}/icons`} component={Icons} />
  
  </div>
);

export default Components;