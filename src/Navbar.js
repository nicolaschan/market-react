import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import { LinkContainer } from 'react-router-bootstrap'
import Link from 'react-router-dom/Link'
import NavItem from 'react-bootstrap/NavItem'

const style = {
  'margin-bottom': '1em'
}

function App() {
  return (
    <Navbar bg="light" expand="lg" style={style}>
      <Navbar.Brand>Minecraft Market</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
	<Nav className="mr-auto">
	  <LinkContainer to="/dashboard">
	    <Nav.Link>Dashboard</Nav.Link>
	  </LinkContainer>
	  <LinkContainer to="/users">
	    <Nav.Link>Users</Nav.Link>
	  </LinkContainer>
          <NavDropdown title="Money" id="basic-nav-dropdown">
	    <LinkContainer to="/transfer">
              <NavDropdown.Item>Transfer</NavDropdown.Item>
            </LinkContainer>
	    <LinkContainer to="/history">
              <NavDropdown.Item>History</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
	</Nav>
	<Nav>
          <Button variant="success" style={{'margin-right': '1em'}}>$1000</Button>
	  <Navbar.Text>
	    Signed in as: <Link to="/profile">user</Link>
	  </Navbar.Text>
	</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default App;
