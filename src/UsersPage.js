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

class HistoryPage extends React.Component {
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
        <tr>
	  <td>nc99</td>
	  <td>#nc99</td>
	  <td>hello there</td>
	  <td>$10,000</td>
	</tr>
      </tbody>
    </Table>
  );
  }
}

export default HistoryPage;
