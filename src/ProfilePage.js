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
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

class ProfilePage extends React.Component {
  render () {
    return (
      <Container>
      <Card>
        <Card.Header>Profile</Card.Header>
	<Card.Body>
	  <InputGroup className="mb-3">
	  <InputGroup.Prepend>
	    <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
	  </InputGroup.Prepend>
	  <FormControl placeholder="Username" aria-label="Username" aria-described-by="basic-addon1" />
	  </InputGroup>
	  <InputGroup className="mb-3">
	  <InputGroup.Prepend>
	    <InputGroup.Text id="basic-addon2">Tagline</InputGroup.Text>
	  </InputGroup.Prepend>
	  <FormControl placeholder="What do you want to say?" aria-label="Tagline" aria-described-by="basic-addon2" />
	  </InputGroup>
	</Card.Body>
	<Card.Footer>
	    <Button variant="success">Save</Button>
	</Card.Footer>
      </Card>
      <hr />
      <Card>
        <Card.Header>Settings</Card.Header>
	<Card.Body>
	  <InputGroup className="mb-3">
	  <InputGroup.Prepend>
	    <InputGroup.Text id="basic-addon3">Password</InputGroup.Text>
	  </InputGroup.Prepend>
	  <FormControl type="password" placeholder="Password" aria-label="Password" aria-described-by="basic-addon3" />
	  </InputGroup>
	</Card.Body>
	<Card.Footer>
	    <Button variant="success">Save</Button>
	</Card.Footer>
      </Card>
      <hr />
      <Card>
        <Card.Header>Danger Zone</Card.Header>
	<Card.Body>
	  <Button variant="danger">Delete Account</Button>
	</Card.Body>
      </Card>
      </Container>
    )
  }
}

export default ProfilePage;
