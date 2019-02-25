import React, { Component } from 'react';
import { Form, Label, Button } from 'semantic-ui-react';
import './style.css';
import { withRouter } from  'react-router-dom';

class Login extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      password: ''
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault();

    const loginResponse = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/auth/login`, {
      method: 'POST',
      credentials: 'include', // this sends our session cookie with our request
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const parsedResponse = await loginResponse.json();

    if(loginResponse.ok){
      // change our component
      console.log('succes login')
      // this automatically get passed to your component as a prop
      this.props.history.push('/movies');
    }
  }
  render(){
    return (

      <Form onSubmit={this.handleSubmit}>
        <Label> Username</Label>
        <Form.Input type='text' name="username" onChange={this.handleChange} />
        <Label> Password</Label>
        <Form.Input type='password' name="password" onChange={this.handleChange} />
        <Button type="Submit" color="green">Login</Button>
      </Form>
      )
  }
}

export default withRouter(Login);
