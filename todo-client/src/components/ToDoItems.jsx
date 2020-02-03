import React, { Component } from 'react'

export default class ToDoItems extends Component {
    render() {
        console.log("To Do Items");
        return (
            <div className="mt-2 todo-add">
                <h3 className="text-dark text-center bg-light">
                    <button type="button" className="close float-left m-1" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    {/* <i className="fa fa-times-circle fa-sm float-left m-1"></i> */}
                    Task
                <input type="checkbox" className="m-2 float-right" id="" />
                </h3>
            </div>
        )
    }
}
