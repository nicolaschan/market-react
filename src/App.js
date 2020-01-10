import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import HistoryPage from './HistoryPage'
import TransferPage from './TransferPage'
import UsersPage from './UsersPage'
import ProfilePage from './ProfilePage'
import LoginPage from './LoginPage'
import CreatePage from './CreatePage'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

function reducer(state = {}, action) {
  return {}
}
const store = createStore(reducer)

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Navbar />
      <Container>
      <Switch>
        <Route path="/dashboard">
	  <span>dashboard</span>
	</Route>
	<Route path="/transfer">
	  <TransferPage />
	</Route>
	<Route path="/users">
	  <UsersPage />
	</Route>
	<Route path="/history">
	  <HistoryPage />
	</Route>
	<Route path="/profile">
	  <ProfilePage />
	</Route>
	<Route path="/login">
	  <LoginPage />
	</Route>
	<Route path="/create">
	  <CreatePage />
	</Route>
      </Switch>
      </Container>
    </Router>
    </Provider>
  );
}

export default App;
