import React, { Component } from 'react';
import API from '../api/todo';

export default class ToDoItems extends Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete() {
        let todo_id = this.props.todo._id;
        if (todo_id) {
            API.removeToDo(todo_id).then(response => {
                console.log(response);
            }).catch(err => {

            })
        }
    }
    render() {
        return (
            <div className="mt-2 todo-add">
                <h3 className="text-dark text-center bg-light">
                    <button type="button" className="close float-left m-1" aria-label="Close" onClick={this.onDelete}>
                        <span aria-hidden="true" >&times;</span>
                    </button>
                    {this.props.todo.todo_task}
                    <input type="checkbox" className="m-2 float-right" id="" />
                </h3>
            </div >
        )
    }
}
