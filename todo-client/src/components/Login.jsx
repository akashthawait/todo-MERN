import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import API from '../api/todo';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user_email: "",
            user_password: "",
            validation: false,
            redirect_url: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    onLoginClick(e) {
        e.preventDefault();
        var email = this.state.user_email;
        var password = this.state.user_password;

        if (email && password) {
            let that = this;
            API.login(email, password).then(result => {
                let temp = result.data;
                // console.log(temp.result.data);
                if (temp && temp.result.data && temp.result.data.user_id) {
                    let redirect_url = "/todo/" + temp.result.data.user_id;
                    that.setState({
                        redirect_url: redirect_url
                    });
                    localStorage.setItem("user_id", temp.result.data.user_id);
                } else {

                }
            }).catch(err => {
                that.setState({
                    validation: false,
                    password: ''
                })
                throw err;
            })
        } else {
            if (email && !password) {
                this.refs.passwordText.focus();
                this.setState({
                    validation: false
                });
            } else {
                this.refs.emailText.focus();
                this.setState({
                    validation: false
                })
            }
        }
    }

    render() {
        const { user_email, user_password, redirect_url } = this.state;
        console.log("redirect_url: ", redirect_url);
        if (redirect_url !== "") {
            return (<Redirect to={redirect_url}></Redirect>);
        } else {
            return (
                <div className="todo-add">
                    <form onSubmit={this.onLoginClick}>
                        <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
                        <div className="form-group">
                            <input type="email" className="form-control" ref="emailText" placeholder="Enter Email" name="user_email" value={user_email} onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" ref="passwordText" placeholder="Enter Password" name="user_password" value={user_password} onChange={this.handleChange} />
                        </div>
                        <div className="form-group ">
                            <button type="submit" className="btn btn-primary">Sign In</button>
                            <Link className="float-right" to="/signup">Register here </Link>
                        </div>
                    </form>
                </div>
            )
        }

    }
}
