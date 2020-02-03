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
                        password: password_hash
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


}
exports.establishRoutes = establishRoutes;