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
import Spinner from 'react-bootstrap/Spinner'
import { connect } from 'react-redux'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class LoginPage extends React.Component {
  constructor (props) {
    super(props)
    this.props.register()
    this.state = {
      user: {
        username: '',
        bankid: '',
        password: ''
      },
      validation: {
	username: { state: 'empty', message: '' },
	bankid: { state: 'empty', message: '' },
	password: { state: 'empty', message: '' }
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    const { name, value } = event.target
    const { user, validation } = this.state
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
      validation: {
	...validation,
	[name]: { state: value ? 'loading' : 'empty', message: 'Checking...' }
      }
    })
    if (!value) { return }
    switch (name) {
      case 'username':
	return this.setState({ validation: { ...validation, [name]: {
	  state: 'valid',
	  message: 'Great!'
	}}})
      case 'bankid':
	if (!value.match(/^[0-9a-zA-Z_]+$/)) {
	  return this.setState({ validation: { ...validation, [name]: {
	    state: 'invalid',
	    message: 'Bank ID may only contain letters, numbers, and underscore'
	  }}})
	}
	return axios.get(`/api/v1/users/${value}`)
	 .then(res => this.state.user[name] === value && this.setState({ validation: { ...validation, [name]: {
	    state: 'invalid',
            message: 'Bank ID taken'
	 }}}))
	 .catch(err => this.state.user[name] === value && this.setState({ validation: { ...validation, [name]: {
	    state: 'valid',
	    message: 'Great!',
	 }}}))
      case 'password':
	return fetch(`/api/v1/pwned_passwords/${value}`)
	  .then(resp => resp.json())
	  .then(result => this.state.user[name] === value && this.setState({ validation: { ...validation, [name]: {
	     state: result ? 'invalid' : 'valid',
	     message: result ? 'Password appears on list of compromised passwords' : 'Great!'
	  }}}))
    }
  }

  handleSubmit (event) {
    event.preventDefault()
    axios.post('/api/v1/users', {
      username: this.state.user.username,
      bankid: this.state.user.bankid,
      password: this.state.user.password
    })
    .then(res => {
      this.props.history.push('/login')
    })
    .catch(console.log)
  }

  render () {
    return (
      <Container>
      <Nav variant="tabs">
	<LinkContainer to="/login">
	  <Nav.Link>Login</Nav.Link>
	</LinkContainer>
	<LinkContainer to="/create">
	  <Nav.Link>Create Account</Nav.Link>
	</LinkContainer>
      </Nav>
      <br />
      <Card>
        <Card.Header>Create Account</Card.Header>
	<Card.Body>
	  <Form>
	    <Form.Group controlId="formUsername">
	      <Form.Label>Choose a display name</Form.Label>
	      <Form.Control autocomplete="off" type="text" name="username" placeholder="Display name" onChange={this.handleChange} isValid={this.state.validation.username.state === 'valid'} isInvalid={this.state.validation.username.state === 'invalid'} autoFocus maxlength={24} />
	      <Form.Control.Feedback>
	        {this.state.validation.username.message}
	      </Form.Control.Feedback>
	      <Form.Control.Feedback type="invalid">
	        {this.state.validation.username.message}
	      </Form.Control.Feedback>
	    </Form.Group>
	    <Form.Group controlId="formBankId">
	      <Form.Label>Choose a permanent, unique Bank ID</Form.Label>
	      <InputGroup>
	        <InputGroup.Prepend>
	          <InputGroup.Text id="bank-id-prepend">#</InputGroup.Text>
	        </InputGroup.Prepend>
	        <Form.Control type="text" name="bankid" placeholder="Bank ID" aria-described-by="bank-id-prepend" onChange={this.handleChange} isValid={this.state.validation.bankid.state === 'valid'} isInvalid={this.state.validation.bankid.state === 'invalid'} maxlength={24} />
  	        <Form.Control.Feedback>
	          {this.state.validation.bankid.message}
	        </Form.Control.Feedback>
	        <Form.Control.Feedback type="invalid">
	          {this.state.validation.bankid.message}
	        </Form.Control.Feedback>
	      </InputGroup>
	    </Form.Group>
	    <Form.Group controlId="formBasicPassword">
	      <Form.Label>Choose a password</Form.Label>
	      <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange} isValid={this.state.validation.password.state === 'valid'} isInvalid={this.state.validation.password.state === 'invalid'} />
	      <Form.Control.Feedback>
	        {this.state.validation.password.message}
	      </Form.Control.Feedback>
	      <Form.Control.Feedback type="invalid">
	        {this.state.validation.password.message}
	      </Form.Control.Feedback>
	    </Form.Group>
	  </Form>
	</Card.Body>
	<Card.Footer>
	    <ButtonGroup aria-label="Create account button group">
	      <Button variant="success" enabled={!(this.state.validation.username.state === 'valid' && this.state.validation.bankid.state === 'valid' && this.state.validation.password.state === 'valid')} onClick={this.handleSubmit}>Create Account</Button>
	    </ButtonGroup>
	</Card.Footer>
      </Card>
      </Container>
    )
  }
}


const mapState = state => {
  return {}
}


function register() {
  return { type: 'REGISTER' }
}

const actionCreators = {
  register
}

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export default withRouter(connectedLoginPage)
