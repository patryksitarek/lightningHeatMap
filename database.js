const sqlite3 = require('sqlite3').verbose()

// CONFIG
const DATABASE = 'lightningCoords.db'

const db = new sqlite3.Database(DATABASE, (err) => {
  if (err) {
    console.error(err)
  }
})

module.exports = db
