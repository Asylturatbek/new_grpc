const {pool} = require('./../dbConfig.js')

module.exports = async function(call) {
	const sessionKey = call.metadata.get("sessionkey")[0]
	if(sessionKey){

		result = await pool.query("DELETE FROM sessions WHERE createddate < NOW() - INTERVAL '10 minutes'")
		const { rows } = await pool.query('SELECT * FROM sessions WHERE sessionkey = $1',[sessionKey])

		if(rows.length>0){
			return {
				success:true,
				data: null
			}
		} else {
			return {
				success: false,
				data:'please give a valid sessionkey!'
			}
		}
	} else {
		return {
			success: false,
			data: "you didn't give a sessionkey!"
		}
	}
}