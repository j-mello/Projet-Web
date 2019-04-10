const { Pool } = require('pg')
const utils = {}

// Inialisation de la connexion
const pool = new Pool({
 user: 'jjucvbvu',
 host: 'dumbo.db.elephantsql.com',
 database: 'jjucvbvu',
 password: 'iAoN8-uHCjFIRvI8-HZhBjTRSiwrKmyx',
 port: 5432,
})

utils.executeQuery = (sql, params, callback) => {
  // 1. Connection
  pool.connect((err, client, done) => {
    if(err) {
      return console.error('error fetching client from pool', err)
    }
    // 2. Execute the query
    client.query(sql, params, (err, result) => {
      // 3. Close Connection
      done()

      if (err) {
        console.log(err)
      }
      else {
        // 4. Execute the callback(res)
        callback(result)
      }
    })
  })
}

module.exports = utils