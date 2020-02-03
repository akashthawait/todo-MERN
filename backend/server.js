var app = require('express')();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes').establishRoutes(app);
var port = 5000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});