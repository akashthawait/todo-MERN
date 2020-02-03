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

let API = {
    login: login,
    signup: signup
}
export default API;