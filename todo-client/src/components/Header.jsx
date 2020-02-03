import React, { Component } from 'react'
import API from '../api/todo';
export default class Header extends Component {

    constructor(props) {
        super(props);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }
    onLogoutClick() {
        API.logout();
    }
    render() {
        return (
            <div>
                <span>
                    <input type="button" className="btn btn-danger rounded-0 float-right" value="Logout" onClick={this.onLogoutClick} />
                </span>
                <h3 className="card text-center btn bg-info rounded-0 mt-3 text-light">MERN ToDo List App
                </h3>
            </div>
        )
    }
}
