var express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
const bodyParser = require('body-parser');
const projectRouter = require('./routers/project');
const newsRouter = require('./routers/news');
const publicationsRouter = require('./routers/publications');
const joinUsRouter = require('./routers/joinUs');
const teamRouter = require('./routers/team');
require('dotenv/config');

const connect = mongoose.connect(process.env.mongoUrl, { useNewUrlParser: true, keepAlive: true, useUnifiedTopology: true });
connect.then((db) => {
    console.log("Connected to db successful");
}, (err) => { console.log("Unable to connect to the db " + err); });


var app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use('/', (req, res) => {
//     return res.send("hello world");
// });
app.use('/project', projectRouter);
app.use('/news', newsRouter);
app.use('/publications', publicationsRouter);
app.use('/team', teamRouter);
app.use('/joinus',joinUsRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log("Currently Connected to port 5000");
});
module.exports = app;
