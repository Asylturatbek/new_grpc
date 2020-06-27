const client = require('./client.js')

client.AddProduct({name:'dengi', categoryId:4}, (err, response) => {
	if(!err) {
		console.log(response)
	} else {
		console.error(err)
	}
})