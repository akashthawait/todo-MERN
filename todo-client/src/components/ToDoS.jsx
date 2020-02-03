import React, { Component } from 'react'
import ToDoItems from './ToDoItems';
import CreateToDo from './CreateToDo';
export default class ToDoS extends Component {
    
    render() {
        console.log("To Dos");
        return (
            <div>
                <CreateToDo></CreateToDo>
                <ToDoItems></ToDoItems>
                <ToDoItems></ToDoItems>
                <ToDoItems></ToDoItems>
                <ToDoItems></ToDoItems>
            </div>
        )
    }
}
