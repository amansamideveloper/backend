const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path')
require('dotenv').config()
const app = express();

const routerUser = require('./routes/api/user');
const routerTask = require('./routes/api/task');


// connect to database
mongoose.connect(process.env.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(console.log('Database connected successfully'))
    .catch(err => console.log(err));
// initialize passport
app.use(passport.initialize())

require('./config/passport')(passport)

// middware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// router
app.use('/api/v1/users', routerUser);
app.use('/api/v1/tasks', routerTask);
// listening to port
app.listen(port, (req, res) => console.log(`server running on server ${port}`))
