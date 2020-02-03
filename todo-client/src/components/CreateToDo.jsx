import React, { Component } from 'react'
import API from '../api/todo';
export default class CreateToDo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todotask: "",
            validation: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmitTodo = this.onSubmitTodo.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    onSubmitTodo(e) {
        e.preventDefault();
        var todotask = this.state.todotask;
        var user_id = localStorage.getItem("user_id");
        if (todotask && user_id) {
            API.addToDo(user_id, todotask).then(result => {
                let temp = result.data;
                if (temp.status) {
                    alert(temp.message);
                } else {
                    alert(temp.message);
                }
            }).catch(err => {

            });
        } else {
            this.refs.txtToDo.focus();
            this.setState({
                validation: false
            });
        }
    }
    render() {
        const { todotask } = this.state;
        return (
            <form className="todo-add" onSubmit={this.onSubmitTodo}>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Add your task here" ref="txtToDo" name="todotask" value={todotask} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Add ToDo</button>
                </div>
            </form>
        )
    }
}
