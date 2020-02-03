import React, { Component } from 'react'
export default class CreateToDo extends Component {
    render() {
        return (
            <form className="todo-add">
                <div className="form-group">
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Add ToDo</button>
                </div>
            </form>
        )
    }
}
