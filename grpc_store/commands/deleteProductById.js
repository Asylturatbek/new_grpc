const client = require('./client.js')

client.DeleteProductById({id: 3}, (err, response) => {
	if(!err) {
		console.log(response)
	} else {
		console.error(err)
	}
})