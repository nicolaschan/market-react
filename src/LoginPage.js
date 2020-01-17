import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import { LinkContainer } from 'react-router-bootstrap'
import Link from 'react-router-dom/Link'
import NavItem from 'react-bootstrap/NavItem'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

class LoginPage extends React.Component {
  render () {
    return (
      <Container>
      <Nav variant="tabs" defaultActiveKey="/login">
	<LinkContainer to="/login">
	  <Nav.Link>Login</Nav.Link>
	</LinkContainer>
	<LinkContainer to="/create">
	  <Nav.Link>Create Account</Nav.Link>
	</LinkContainer>
      </Nav>
      <br />
      <Card>
        <Card.Header>Login</Card.Header>
	<Card.Body>
	  <Form>
	    <Form.Group controlId="formBasicId">
	      <InputGroup>
	        <InputGroup.Prepend>
	          <InputGroup.Text id="bank-id-prepend">#</InputGroup.Text>
	        </InputGroup.Prepend>
	        <Form.Control type="text" name="bankid" placeholder="Bank ID" aria-described-by="bank-id-prepend" maxlength={24} autoFocus />
	    </InputGroup>
	    </Form.Group>
	    <Form.Group controlId="formBasicEmail">
	      <Form.Control type="password" placeholder="Password" />
	    </Form.Group>
	  </Form>
	</Card.Body>
	<Card.Footer>
	    <ButtonGroup aria-label="Login button group">
	      <Button variant="success">Login</Button>
	    </ButtonGroup>
	</Card.Footer>
      </Card>
      </Container>
    )
  }
}

export default LoginPage;
