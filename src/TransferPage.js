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
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

class TransactionPage extends React.Component {
  render () {
    return (
      <Container>
      <Card>
        <Card.Header>Send Money</Card.Header>
	<Card.Body>
	  <InputGroup className="mb-3">
	  <FormControl placeholder="Recipient" aria-label="Username" />
	  </InputGroup>
	  <InputGroup className="mb-3">
	  <InputGroup.Prepend>
	    <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
	  </InputGroup.Prepend>
	  <FormControl type="number" placeholder="0" aria-label="Amount" aria-described-by="basic-addon1" />
	  </InputGroup>
	  <InputGroup className="mb-3">
	  <InputGroup.Prepend>
	    <InputGroup.Text id="basic-addon2">Memo</InputGroup.Text>
	  </InputGroup.Prepend>
	  <FormControl placeholder="Reason for sending money" aria-label="Memo" aria-described-by="basic-addon2" />
	  </InputGroup>
	</Card.Body>
	<Card.Footer>
	    <Button variant="success" disabled>Send Money</Button>
	</Card.Footer>
      </Card>
      </Container>
    )
  }
}

export default TransactionPage;
