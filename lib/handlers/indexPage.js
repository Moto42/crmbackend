// Serves the index path.

// Will serve a login page if the user is not logged in.
// if the user is logged in, then will serve up, or redirect to, the console.




//ONly accepts GET
const index = function(data,callback){

	const method = typeof(data.method) == 'string' && acceptableMethods.indexOf(data.method.toLowerCase()) > -1 ? data.method : false;

  callback(404);
};

module.exports = index; 

