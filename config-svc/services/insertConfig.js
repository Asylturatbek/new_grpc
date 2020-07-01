const {DB} = require('./../dbConfig.js')
const grpc = require('grpc')
const db = new DB()

module.exports = async function(call, callback) {

	try {
			const {isGlobal, userId, configKey, configValue} = call.request
			
			if(isGlobal!==undefined && userId!=='' && configKey && configValue) {
				const {rows} = await db.insertConfig(isGlobal, userId, configKey, configValue)
				callback(null, {success: true, error:{code:null, data: null}})
			} else {
				callback(null, {success:false, error:{code:grpc.status.INVALID_ARGUMENT, data:'argument is missing'}})
			}

	} catch(err) {
		callback(new Error("Internal server error"));
		console.error(err)
	}
}