const verifySession = require('./../middlewares/verify.js')

let usersInChat = []

const handleStream = async (call) => {
	console.log(`User has joined`)

	call.on('cancelled', () => {
		console.log('one user has left')
		usersInChat = usersInChat.filter(user => user !== call)
	})
	const result = await verifySession(call)

	if(result.success) {
		const person = {
			userId: result.data.userid,
			callFromStream: call
		}
		usersInChat.push(person)
	} else {
		call.write({message: 'You are not allowed my men! Give me valid session key'})
		call.end()
	}
}


module.exports = {handleStream, usersInChat}