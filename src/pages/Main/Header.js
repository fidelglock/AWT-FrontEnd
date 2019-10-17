/* ./node_modules/react */
import React from '../../../node_modules/react';  
import { connect } from '../../../node_modules/react-redux';
import { toggleMobileNavVisibility } from '../../reducers/Layout';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl } from '../../../node_modules/react-bootstrap';

const handleLogout = () => {
  sessionStorage.removeItem('userAuth');
  global.IsAuthenticated = false;
  //TODO: Redirect to home page
  window.location.href = '/';
}

const Header = ({
  showMobileMenu,
  toggleMobileNavVisibility
}) => (
  <Navbar fluid={true}>
  <Navbar.Header>
    <button type="button" className="navbar-toggle" data-toggle="collapse" onClick={toggleMobileNavVisibility}>
      <span className="sr-only">Toggle navigation</span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
    </button>
  </Navbar.Header>

      <Navbar.Collapse>

        <div className="separator"></div>
        <Navbar.Form pullLeft>
        </Navbar.Form>
        <Nav pullRight>
        {/* {(global.IsAuthenticated = true)? (<NavItem onClick={()=> handleLogout()}><a  href="/" ></a>Log out</NavItem>):('')  */
      }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

const mapDispatchToProp = dispatch => ({
  toggleMobileNavVisibility: () => dispatch(toggleMobileNavVisibility()),
  handleLogout: ()=> dispatch(handleLogout)
});

export default connect(null, mapDispatchToProp)(Header);