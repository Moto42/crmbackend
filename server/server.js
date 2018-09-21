// The server related logic for the CRM

//Dependencies
const config        = require('../config');
const http          = require('http');
const https         = require('https');
const url           = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const router        = require('./router');
const sanity        = require('./sanity');

//Container for the server
const lib = {}

lib.unifiedServerLogic = function(req,res){
	//Parse incoming req
	const parsedURL = url.parse(req.url,true);
	const path = parsedURL.pathname.replace(/^\/+|\/+$/g, '');
	const query = parsedURL.query;
	const method = req.method.toLowerCase();
	const headers = req.headers;

	  // Get the payload,if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', function(data) {
      buffer += decoder.write(data);
  });
  req.on('end', function() {
		buffer += decoder.end();
		
		//Assemble the data Object to send to the handler
		const data = {
			path : path,
			query : query,
			method : method,
			headers : headers,
		}

		//route the data to the appropriate handler
		const chosenHandler = typeof(router[data.path]) !== 'undefined' ? router[data.path] : router.notFound;
	console.log('path:',path);
		chosenHandler(data,function(statusCode,payload){
			//responding 
			sanity.statusCode();
			sanity.payload();
			payload = JSON.stringify(payload);
			res.writeHead(statusCode);
			res.end(payload);
			console.log("Returning this response: ",statusCode,payload);
    
		})
  });

	console.log(path,method,query);
}


//Start a server with a specified protocol on a specified port
lib.startServer = function(protocol,port, callback){
	sanity.protocol(protocol);
	sanity.port(port);
	if(protocol && port){
	
		if(protocol == 'http'){
			// start HTTP server
			http.createServer(lib.unifiedServerLogic).listen(port,function(){console.log('http server listening on port ',port)});
			console.log('http server created and listening');
		} else {
			https.createServer(lib.unifiedServerLogic).listen(port,function(){console.log('https server listening on port ',port)});
		}
	} else {
		callback('error: server must be intialized with argumments ([\'http\',\'https\']),integer')
	}
}

lib.init = function(callback){
	//Start the HTTP server
	lib.startServer('http',config.portHTTP,callback);
	// Start the HTTPS server

}




module.exports = lib;