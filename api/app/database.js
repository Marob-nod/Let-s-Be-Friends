const {Pool} = require('pg');
const config = {
    connectionString: process.env.DATABASE_URL
}
if(process.env.NODE_ENV === 'production'){
    // config pour la version de prod heroku
    config.ssl = {
        rejectUnauthorized : false
    }
}
const pool = new Pool(config);

pool.connect();

module.exports = pool;