import React,  {Component} from 'react';
import Login from '../Login';
import Register from '../Register/Register';
import { Form, Label, Button } from 'semantic-ui-react';


export default class AuthGateway extends Component{
    constructor(){
        super();
        this.state = {
            loggingIn: true
        }
    }
    toggleLogin = (e) => {
        this.setState({
            loggingIn: !this.state.loggingIn
        })
    }
    render(){
        return(
            <div>
                { this.state.loggingIn ? 
                    <div>
                        <Login />
                        <Button onClick={this.toggleLogin}> New User? Register! </Button>
                    </div>
                    :
                    <div>
                        <Register />
                        <Button onClick={this.toggleLogin}> I've been here before, just log me in </Button>
                </div>
                }
            </div>
        )
    }
}