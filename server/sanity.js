
//Sanity Checking
// All sanity checking goes into this object
sanity ={}; //"Every day's a good day to blow a san check."

sanity.protocol = function(protocol){
	protocol = 
		typeof protocol == 'string' &&
		['http','hppts'].indexOf(protocol) > -1
	? protocol : false;
	return protocol;
}
sanity.port = function(port){
	port =
		typeof port == 'number' &&
		port % 1 === 0
	? port : false;
	return port;
}
sanity.statusCode = function(statusCode){
	return typeof(statusCode) == 'number' ? statusCode : 200;
}
sanity.payload = function(payload){
	return typeof(payload) == 'object'? payload : {};
}

module.exports = sanity;