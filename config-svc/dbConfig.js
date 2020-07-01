require('dotenv').config();

const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
	connectionString: isProduction ? process.env.DATABASE_URL : connectionString
})

exports.pool = pool 

class DB {
	constructor(id, isGlobal, userId, configKey, configValue){
		this.id = id
		this.isGlobal = isGlobal
		this.userId = userId
		this.configKey = configKey
		this.configValue = configValue
	}

	insertConfig(isGlobal, userId, configKey, configValue) {
		return pool.query(`INSERT INTO configs (isglobal, userid, configkey, configvalue)
				 VALUES ($1, $2, $3, $4)`, [isGlobal, userId, configKey, configValue])
	}

	getConfigs(userId) {
		return pool.query(`SELECT id, isglobal as "isGlobal", userid as "userId",
			 configkey as "configKey", configvalue as "configValue" FROM configs WHERE userid = $1`,[userId])
	}

	getGlobalConfigs() {
		return pool.query(`SELECT id, isglobal as "isGlobal", userid as "userId",
			 configkey as "configKey", configvalue as "configValue" FROM configs WHERE userid is NULL`)
	}

	updateConfig(configValue, id) {
		return pool.query(`UPDATE configs SET configvalue = ($1) WHERE id = ($2) RETURNING *`, [configValue, id])
	}
}

exports.DB = DB