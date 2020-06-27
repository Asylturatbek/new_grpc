const client = require('./client.js')

const user = { username: 'Asan', password: 'password' }
client.Register(user, (err, response) => {
	if(!err) {
		console.log('received response from server for registration')
		console.log(response)
	} else {
		console.error(err)
	}
})