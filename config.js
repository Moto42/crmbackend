// Configuration for the backend in various environmens

//Staging Config
const staging  = {
	//Server Configuration Data
	portHTTP : 3000,
	portHTTPS: 3001,
}





//Decide which config data to export
let configToExport = {};
switch (process.env.NODE_ENV) {
	case 'staging':
		configToExport = staging;
		break;
	default:
		configToExport = staging;
		break;
}

module.exports = configToExport;