var app = require('express')();
require('./routes').establishRoutes(app);
var port = 5000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});