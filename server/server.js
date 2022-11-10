const express = require('express');
const server = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
//const accesslog = require('access-log');

const ONE_HOUR = 1000 * 60 * 60 * 1;





//Bodyparser middleware

server.use(bodyParser.json({ limit: "1024mb", extended: true }));



const allowCrossDomain = (req, res, next) => {

    //console.log( req.headers.origin)

    res.header('Access-Control-Allow-Origin',  req.headers.origin);

    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

    res.header('Access-Control-Allow-Credentials', true);

    res.header('Access-Control-Allow-Headers', 'Content-Type, Token, MODE, Environment, OwnerId, EventName, CustomHeader');

    next();

}



// inititalize Middleware

server.use(express.json({ extended: false }));



server.disable('x-powered-by');

server.use(allowCrossDomain);

server.get('/api/test', (req, res) => {

    let names = { name: "kalaitest", age: 22 };
    res.json(JSON.stringify(names));

});

server.use('/api/auth', require('./routes/api/auth'));
server.use('/api/getlist', require('./routes/api/auth'));
server.use('/api/gethistory', require('./routes/api/auth'));



// If the server running in Production

if(process.env.NODE_ENV === 'production'){


}



//server.use(express.static(path.join(__dirname, 'build')));




server.use(express.static(path.join(__dirname, '../client', 'build')));
server.get('/', function(req, res) {

    //res.sendFile(path.join(__dirname, 'build', 'index.html'));

    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));

});
 



//const PORT = process.env.PORT || 5000;

server.listen(process.env.PORT, process.env.ADDRESS, () => {
    process.sessionStorage = {};
   
    console.log("server running in ", process.env.ADDRESS,":",process.env.PORT); 
}).timeout = 700000;


// server.listen(5000, () => {

//     console.log("server running in ",":",5000);

// }).timeout = 700000; 