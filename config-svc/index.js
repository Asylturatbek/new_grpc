const PROTO_PATH = __dirname + '/config.proto';


const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {})

const packageObject = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()


const listConfigs = require('./services/listConfigs.js')
const addConfig = require('./services/insertConfig.js')
const updateConfig = require('./services/updateConfig.js')
const {handleStream} = require('./services/handleStream.js')

server.addService(packageObject.ConfigService.service, {
	'ListConfigs': listConfigs,
	'AddConfig': addConfig,
	'UpdateConfig': updateConfig,
	'Status': handleStream
})

server.bind('127.0.0.1:60061',
	grpc.ServerCredentials.createInsecure())

console.log('server running at hhtp://127.0.0.1:60061')
server.start()