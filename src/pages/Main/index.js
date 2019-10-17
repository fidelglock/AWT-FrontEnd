import React from "react";
import { Route, Router } from "react-router-dom";
import { connect } from "react-redux";
import cx from "classnames";
import { setMobileNavVisibility } from "../../reducers/Layout";
import { withRouter } from "react-router-dom";

import Header from './Header';
import Footer from './Footer';
import SideBar from '../../components/SideBar';

/**
 * Pages
 */
import Home from '../Home';
import viewProjects from '../Home/viewProjects'
import viewProjectsDetails from '../Home/viewProjectsDetails'
import Login from '../Login'
import adminDashboard from '../Home/adminDashboard'
import studentProject from '../Home/StudentRegister'
import ProjectSignup from '../Home/ProjectSignup'

const Main = ({ mobileNavVisibility, hideMobileMenu, history }) => {
  history.listen(() => {
    if (mobileNavVisibility === true) {
      hideMobileMenu();
    }
  });
  const isUserloggedIn = true;
  return (
    <div
      className={cx({
        "nav-open": mobileNavVisibility === true
      })}
    >
      <div className="wrapper">
        <div className="close-layer" onClick={hideMobileMenu} />
        <SideBar />

        <div className="main-panel">
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/projects" component={viewProjects} />
          <Route exact path="/projects/:projectId" component={viewProjectsDetails} />
          <Route exact path="/admin" component={adminDashboard} />
          <Route exact path="/StudentRegister" component={studentProject} />
          <Route exact path="/ProjectSignup" component={ProjectSignup} />
          <Footer />
        </div>
      </div>
      }
    </div>
  );
};

const mapStateToProp = state => ({
  mobileNavVisibility: state.Layout.mobileNavVisibility
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  hideMobileMenu: () => dispatch(setMobileNavVisibility(false))
});

export default withRouter(
  connect(
    mapStateToProp,
    mapDispatchToProps
  )(Main)
);
