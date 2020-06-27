var PROTO_PATH = __dirname + '/auth.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const packageObject = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()

const register = require('./routes/register.js')
const authenticate = require('./routes/authenticate.js')

server.addService(packageObject.AuthService.service, {
	'Register': register,
	'Authenticate': authenticate
})

server.bind('127.0.0.1:50051',
	grpc.ServerCredentials.createInsecure())

console.log('server running at hhtp://127.0.0.1:50051')
server.start()