// The router
//Moved into it's own file to be easy to find and alter

const router = {
	'notFound' : require('../lib/handlers/notFound'),
	'sample'   : require('../lib/handlers/sample'),
}

module.exports = router;
