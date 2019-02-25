import React, { Component } from 'react';
import { Form, Label, Button } from 'semantic-ui-react';
import './style.css';
import { withRouter } from 'react-router-dom';

class Register extends Component {
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
    console.log("GOING TO THE DB");
    console.log(this.state);
    const RegisterResponse = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/auth/register`, {
      method: 'POST',
      credentials: 'include', // this sends our session cookie with our request
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(RegisterResponse.ok){
      const parsedResponse = await RegisterResponse.json();
      console.log('succes Register')
      console.log(parsedResponse);
      // this automatically get passed to your component as a prop
      this.props.history.push('/movies');
    }else{
      console.log("BLAAAAH");
    }
  }
  render(){
    return (

      <Form onSubmit={this.handleSubmit}>
        <Label> Username</Label>
        <Form.Input type='text' name="username" onChange={this.handleChange} />
        <Label> Password</Label>
        <Form.Input type='password' name="password" onChange={this.handleChange} />
        <Button type="Submit" color="green">Register</Button>
      </Form>
      )
  }
}

export default withRouter(Register);