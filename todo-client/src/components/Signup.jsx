import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import API from '../api/todo';
export default class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user_email: "",
            user_password: "",
            validation: false,
            redirect: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSignUpClick = this.onSignUpClick.bind(this);

    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    onSignUpClick(e) {
        e.preventDefault();
        var email = this.state.user_email;
        var password = this.state.user_password;

        if (email && password) {
            API.signup(email, password).then(result => {
                let res = result.data;
                if (res.status) {
                    alert('User created successfully');
                    this.setState({
                        redirect: true
                    })
                } else {
                    alert('User already exists');
                }
            });
        } else {
            if (email && !password) {
                this.refs.txtPassword.focus();
                this.setState({
                    validation: false
                })
            } else {
                this.refs.txtEmail.focus();
                this.setState({
                    validation: false
                })
            }
        }
    }

    render() {

        if (this.state.redirect) {
            return (<Redirect to="/login"></Redirect>);
        } else {
            return (
                <div className="todo-add">
                    <form onSubmit={this.onSignUpClick}>
                        <h1 className="h3 mb-3 font-weight-normal text-center">Register</h1>
                        <div className="form-group">
                            <input type="email" ref="txtEmail" className="form-control" placeholder="Enter Email" name="user_email" value={this.state.user_email} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="password" ref="txtPassword" className="form-control" placeholder="Enter Password" name="user_password" value={this.state.user_password} onChange={this.handleChange} />
                        </div>
                        <div className="form-group ">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                </div>
            )
        }
    }
}
