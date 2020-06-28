const {pool} = require('./../dbConfig.js')
const bcrypt = require('bcrypt')
const grpc = require('grpc')

module.exports = async function(call, callback) {

	const {username, password} = call.request

	try {
		if(!username || !password){
			callback(null, {success:false, error:{code:grpc.status.INVALID_ARGUMENT, data:'argument is missing'}})
		}

		const { rows } = await pool.query('SELECT * FROM users WHERE username = $1',[username])
		
		if (rows.length>0){
			callback(null, {success:false, error:{code:grpc.status.ALREADY_EXISTS, data:'there is already user with this username'}})
		} else {
			const hashedPassword = await bcrypt.hash(password, 10)
			const result = await pool.query(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, password`, [username, hashedPassword])
			callback(null, {success:true, error:{code:null, data:null}})
		}
	} catch (err) {
		callback(null, {success:false, error:{code:grpc.status.INTERNAL, data:'internal server error'}})
		console.error(err)
	}

}