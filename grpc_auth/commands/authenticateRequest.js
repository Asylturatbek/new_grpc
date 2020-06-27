const client = require('./client.js')

const user = { username: 'Asan', password: 'password' }
client.Authenticate(user, (err, response) => {
	if(!err) {
		console.log('received response from server for authentication')
		console.log(response)
	} else {
		console.error(err)
	}
})