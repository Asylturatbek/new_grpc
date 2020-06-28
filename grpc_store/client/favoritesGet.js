const client = require('./client.js')
const grpc = require('grpc')

const givenId = process.argv[2]
const givenSessionKey = process.argv[3]

if(givenSessionKey){
	var meta = new grpc.Metadata();
	meta.add('sessionKey', givenSessionKey);
}

client.ListFavoritesByUserId({id:givenId}, meta, (err, favorites) => {
	if(!err) {
		console.log('received favorites')
		console.log(favorites)
	} else {
		console.error({code: err.code, metadata: err.metadata, details: err.details})
	}
})