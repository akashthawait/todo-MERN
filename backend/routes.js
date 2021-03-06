function establishRoutes(app) {
    var Utils = require('./utilities').Utils;
    app.get('/', (request, response, next) => {
        response.json({ status: 1, message: "ToList API" });
    });

    app.post('/api/signup', (request, response, next) => {
        var email = request.body.email;
        var password = request.body.password;
        Utils.getDbClient().then(client => {
            client.collection('users').find({
                email: email
            }).toArray((err, user) => {
                if (err) {
                    console.log(err);
                }
                if (user && user.length) {
                    let res = {
                        status: 0,
                        message: "User already exists"
                    }
                    response.json(res)
                } else {
                    password_hash = Utils.generateHash(password);
                    client.collection('users').insertOne({
                        email: email,
                        password: password_hash,
                        created_at: new Date()
                    }, (err, insert_response) => {
                        if (err) {
                            let res = {
                                status: 0,
                                message: "Something went wrong"
                            }
                            response.json(res)
                        } else {
                            let res = {
                                status: 1,
                                message: "User created successfully"
                            }
                            response.json(res)
                        }
                    });
                }
            });
        }).catch(err => {
            console.error(err);
            let res = {
                status: 0,
                message: "Something went wrong"
            }
            response.json(res)
        })
    });

    app.get('/api/login', (request, response, next) => {
        var email = request.query.email;
        var password = request.query.password;
        Utils.getDbClient().then(client => {
            client.collection('users').find({
                email: email
            }).toArray((err, user) => {
                if (err) {
                    console.error(err);
                    let res = {
                        status: 0,
                        message: "Something went wrong"
                    }
                    response.json(res)
                }
                if (user && user.length) {
                    user_details = user[0];
                    let is_valid_password = Utils.compareHashWithString(user_details.password, password);
                    let res = {};
                    if (is_valid_password) {
                        res = {
                            status: 1,
                            result: {
                                data: {
                                    user_id: user[0]._id,
                                }
                            },
                            message: "Successfully login"
                        }
                    } else {
                        res = {
                            status: 0,
                            message: "Invalid Credentials"
                        }
                    }
                    response.json(res)
                } else {
                    let res = {
                        status: 0,
                        message: "User doesnot exists"
                    }
                    response.json(res)
                }
            });
        }).catch(err => {
            console.error(err);
            let res = {
                status: 0,
                message: "Something went wrong"
            }
            response.json(res)
        })
    });

    app.post('/api/todo', (request, response, next) => {
        var user_id = request.body.user_id;
        var todotask = request.body.todo;
        Utils.getDbClient().then(client => {
            client.collection('todos').insertOne({
                user_id: Utils.convertToMongoObjectID(user_id),
                todo_task: todotask,
                is_completed: false,
                created_at: new Date()
            }, (err, insert_response) => {
                if (err) {
                    let res = {
                        status: 0,
                        message: "Something went wrong"
                    }
                    response.json(res)
                } else {
                    let res = {
                        status: 1,
                        message: "Task added successfully"
                    }
                    response.json(res)
                }
            });
        }).catch(err => {
            console.error(err);
            let res = {
                status: 0,
                message: "Something went wrong"
            }
            response.json(res)
        })
    });

    app.get('/api/todo', (request, response, next) => {
        var user_id = request.query.user_id;
        Utils.getDbClient().then(client => {
            client.collection('todos').find({
                user_id: Utils.convertToMongoObjectID(user_id)
            }).toArray((err, todos) => {
                if (err) {
                    console.error(err);
                    let res = {
                        status: 0,
                        message: "Something went wrong"
                    }
                    response.json(res)
                }
                if (todos && todos.length) {
                    let res = {
                        status: 1,
                        result: {
                            data: {
                                todos: todos,
                            }
                        },
                        message: "Todo list successfully fetched "
                    }
                    response.json(res)
                } else {
                    let res = {
                        status: 0,
                        message: "No tasks exists"
                    }
                    response.json(res)
                }
            });
        }).catch(err => {
            console.error(err);
            let res = {
                status: 0,
                message: "Something went wrong"
            }
            response.json(res)
        })
    });

    app.delete('/api/todo', (request, response, next) => {
        let todo_id = request.query.todo_id;
        Utils.getDbClient().then(client => {
            client.collection('todos').deleteOne({
                _id: Utils.convertToMongoObjectID(todo_id)
            }, (err, obj) => {
                if (err) {
                    console.error(err);
                    let res = {
                        status: 0,
                        message: "Something went wrong"
                    }
                    response.json(res)
                }
                if (obj.result.n) {
                    let res = {
                        status: 1,
                        result: {
                            data: {
                                todos: obj.result.n,
                            }
                        },
                        message: "Todo list deleted"
                    }
                    response.json(res)
                } else {
                    let res = {
                        status: 0,
                        message: "No tasks exists"
                    }
                    response.json(res)
                }
            });
        }).catch(err => {
            console.error(err);
            let res = {
                status: 0,
                message: "Something went wrong"
            }
            response.json(res)
        })
    });
}
exports.establishRoutes = establishRoutes;