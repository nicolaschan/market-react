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
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'

class HistoryPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: null
    }
  }

  componentDidMount () {
    axios.get(`/api/v1/users`)
      .then(res => this.setState({ users: res.data }))
      .catch(err => this.setState({ users: [] }))
   
  }

  render () {
  return (
    <Table hover size="sm">
      <thead>
	<tr>
          <th>Username</th>
	  <th>Bank ID</th>
	  <th>Status Message</th>
	  <th>Balance</th>
	</tr>
      </thead>
      <tbody>
	{ (this.state.users === null) ? (<Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>) : this.state.users.map(user => (<tr><td>{user.username}</td><td>{user.bankid}</td><td>{user.tagline}</td><td>{user.balance}</td></tr>)) }
      </tbody>
    </Table>
  );
  }
}

export default HistoryPage;
