//Entry  point for for the CRM Backend

//Dependencies
const config = require('./config');
const server = require('./server') ;

//Start the server
server.init(console.log);


