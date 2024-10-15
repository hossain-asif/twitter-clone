

const express = require('express');
const passport = require('passport');

const {DBConnect, ServerConfig} = require('./config');

const passportAuth = require('./middlewares/jwt-middleware.js');

const apiRoutes = require('./routes/index.js');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(passport.initialize());
passportAuth(passport);

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log('server started in ', ServerConfig.PORT);
    await DBConnect();
    console.log('Mongo db connected');
});

















