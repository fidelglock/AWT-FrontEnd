import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { stat } from 'fs';


class Nav extends Component {

  constructor(props) {
    super(props)
  }

  state = {
    persontype: 1
  };

  render() {
    let { location } = this.props;
    let qs = this.props.location.search.substr(1);
    this.state.persontype = qs.split('=')[1];

    const isUser = this.state.persontype == 1;

    return (
      <ul className="nav">
        <li className={location.pathname === '/' ? 'active' : null}>
          <Link to="/">
            <i className="pe-7s-home"></i>
            <p>Home</p>
          </Link>
        </li>

        <li className={this.isPathActive('/components') || this.state.componentMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ componentMenuOpen: !this.state.componentMenuOpen })}
            data-toggle="collapse">
            <i className="pe-7s-plugin"></i>
            <p>
              Projects
            <b className="caret"></b>
            </p>
          </a>
          <Collapse in={this.state.componentMenuOpen}>
            <div>
              <ul className="nav">
                <li className={this.isPathActive('/projects') ? 'active' : null}>
                  <Link to="/projects">View Projects</Link>
                </li>
                <li className={this.isPathActive('/ProjectSignup') ? 'active' : null}>
                  <Link to="/ProjectSignup">Project Sign up</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>

        <li className={this.isPathActive('/admin') || this.state.adminMenuOpen ? 'active' : null}>
          <a href="#admin" onClick={() => this.setState({ adminMenuOpen: !this.state.adminMenuOpen })}
            data-toggle="collapse">
            <i className="pe-7s-plugin"></i>
            <p>
            Admin
            <b></b>
            </p>
          </a>
          {/* <Collapse in={this.state.adminMenuOpen}>
            <div>
              <ul className="nav">
              <li className={this.isPathActive('/projects') ? 'active' : null}>
                  <Link to="/projects">View Projects</Link>
                </li>
                <li className={this.isPathActive('/category') ? 'active' : null}>
                  <Link to="/category">Categories</Link>
                </li>                
              </ul>
            </div>
          </Collapse> */}
        </li>

      </ul>
    );
  }



  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);