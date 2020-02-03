import axios from 'axios';

const api_url = "http://localhost:5000/api/";

function login(email, password) {
    return new Promise((resolve, reject) => {
        axios.get(api_url + "login", {
            params: {
                email: email,
                password: password
            }
        }).then((response) => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    })
}

function signup(email, password) {
    return new Promise((resolve, reject) => {
        axios.post(api_url + "signup", {
            email: email,
            password: password
        }).then((response) => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    })
}

function addToDo(user_id, task_name) {
    return new Promise((resolve, reject) => {
        axios.post(api_url + 'todo', {
            user_id: user_id,
            todo: task_name
        }).then((response) => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    });
}

function getToDo(user_id, task_name) {
    return new Promise((resolve, reject) => {
        axios.get(api_url + 'todo', {
            params: { user_id: user_id }
        }).then((response) => {
            resolve(response);
        }).catch(err => {
            reject(err);
        });
    });
}

function logout() {
    localStorage.removeItem("user_id");
    window.location.reload();
}
let API = {
    login: login,
    signup: signup,
    addToDo: addToDo,
    getToDo: getToDo,
    logout: logout
}
export default API;