const {Pool} = require('pg');
console.log(process.env.PORT)
const state = process.env.STATE;
const logger = require('../lib/logger.js');
let poolObj;
    poolObj = {
        "host" : process.env.DB_HOST,
        "port" : process.env.DB_PORT,
        "user" : process.env.DB_USER,
        "password" : process.env.DB_PASSWORD,
        "database" : process.env.DB_DATABASE,
        "max" : process.env.DB_MAX,
        "connectionTimeoutMillis" : process.env.DB_TIMEOUT,
        "idleTimeoutMillis" : process.env.DB_IDLE
    }

const pool = new Pool(poolObj);
module.exports = {
    query: (text, params) => pool.query(text, params)
    .catch((err) =>{
        logger.error(err.stack);
    })
}


