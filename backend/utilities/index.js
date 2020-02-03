const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
function getDbClient() {
    return new Promise((resolve, reject) => {
        let url = "mongodb://todo_user:todo%40123#@ds363088.mlab.com:63088/todo_algo_db"
        MongoClient.connect(url, (err, client) => {
            if (err) {
                reject(err);
            } else {
                console.log("Connected successfully to server");
                const db = client.db();
                resolve(db)
            }
        });
    });
}

function convertToMongoObjectID(string_id) {
    return new ObjectId(string_id);
}

function generateHash(text) {
    const bcrypt = require('bcrypt');
    let saltRounds = 10;
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(text, salt);
    return hash;
}

function compareHashWithString(hash, text) {
    const bcrypt = require('bcrypt');
    return bcrypt.compareSync(text, hash);
}
exports.Utils = {
    getDbClient: getDbClient,
    generateHash: generateHash,
    compareHashWithString: compareHashWithString,
    convertToMongoObjectID: convertToMongoObjectID
}