const client = require('./client.js')
const grpc = require('grpc')

const givenUserId = process.argv[2]
const givenProductId = process.argv[3]
const givenSessionKey = process.argv[4]

if(givenSessionKey){
	var meta = new grpc.Metadata();
	meta.add('sessionKey', givenSessionKey);
}

client.AddToFavorites({userId: givenUserId, productId: givenProductId}, meta, (err, response) =>{
	if(!err) {
		console.log(response)
	} else {
		console.error({code: err.code, metadata: err.metadata, details: err.details})
	}
})