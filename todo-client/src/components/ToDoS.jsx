import React, { Component } from 'react'
import ToDoItems from './ToDoItems';
import CreateToDo from './CreateToDo';
import API from "../api/todo";
export default class ToDoS extends Component {

    constructor(props) {
        super(props);
        this.state = { todos: [] };
    }

    componentDidMount() {
        this.getTodoList();
    }

    // componentDidUpdate() {
    //     this.getTodoList();
    // }

    getTodoList() {
        const user_id = localStorage.getItem('user_id');
        API.getToDo(user_id).then(result => {
            let res = result.data;
            if (res && res.result && res.result.data && res.result.data.todos) {
                const todos_list = res.result.data.todos;
                this.setState({
                    todos: todos_list
                });
            }
        }).catch(err => {
            console.log(err);
        })
    }
    renderToDo() {
        if (this.state.todos.length) {
            return this.state.todos.map(function (currentTodo, i) {
                return (<ToDoItems todo={currentTodo} key={i} />);
            });
        } else {
            return (<div className="card bg-light text-center todo-add">No Tasks</div>)
        }
    }

    render() {
        return (
            <div>
                <CreateToDo></CreateToDo>
                {this.renderToDo()}
            </div>
        )
    }
}
