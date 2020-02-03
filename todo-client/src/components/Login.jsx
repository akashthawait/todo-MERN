import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user_email: "",
            user_password: "",
            validation: false
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
            console.log(email, password);
        } else {
            if (email && !password) {
                this.refs.passwordText.focus();
                this.setState({
                    validation: false
                })
            } else {
                this.refs.emailText.focus();
                this.setState({
                    validation: false
                })
            }
        }
    }

    render() {
        const { user_email, user_password } = this.state;
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
