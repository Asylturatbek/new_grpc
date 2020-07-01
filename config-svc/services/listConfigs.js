const {DB} = require('./../dbConfig.js')
const grpc = require('grpc')
const verifySession = require('./../middlewares/verify.js')
const db = new DB()


module.exports = async function (call, callback) {

	try{
		const result = await verifySession(call)

		if(result.success){

			const id = result.data.userid
			const { rows: configs } = await db.getConfigs(id)
			if(configs.length>0){
				callback(null, { "configs": rows})
			} else {
			 	const globalConfigs = await db.getGlobalConfigs()
				callback(null, { "configs": globalConfigs.rows})
			}		

		} else {
			callback(new Error(result.data));
		}
		
	} catch (err) {
		callback(new Error("Internal server error"));
		console.error(err)
	}
}