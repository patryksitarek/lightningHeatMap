const express = require('express')
const serveStatic = require('serve-static')
const db = require('./database.js')

// CONFIG
const PORT = 8080
const HOSTNAME = '127.0.0.1'
// For safety reasons a this predefined error message will be returned
// instead of a detailed stack trace
const ERR_MESSAGE = 'An error occurred'

const app = express()
app.use(serveStatic('./dist'))

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server listening at http://${HOSTNAME}:${PORT}/`)
})

/* API ENDPOINTS */

// test endpoint
app.get('/api/', (req, res, next) => {
  console.log(`API REQUEST: ${req.hostname} ${req.method} ${req.originalUrl}`)
  res.json({ 'status': 'ok' })
})

// latest - retrieve the latest x records
app.get('/api/latest/:amount', (req, res, next) => {
  console.log(`API REQUEST: ${req.hostname} ${req.method} ${req.originalUrl}`)

  const amount = req.params.amount
  const query = 'SELECT * FROM lightnings ORDER BY date DESC LIMIT ?;'
  db.all(query, [amount], (err, rows) => {
    if (err) {
      console.error(err.message)
      res.json({ 'status': 'error', 'message': ERR_MESSAGE })
    } else {
      const length = rows.length
      console.log(`${req.hostname} successfully retrieved ${length} rows`)
      res.json({
        'status': 'ok',
        'amount': length,
        'data': rows,
      })
    }
  })
})

// count - number of records currently in db
app.get('/api/count', (req, res, next) => {
  console.log(`API REQUEST: ${req.hostname} ${req.method} ${req.originalUrl}`)

  const query = 'select count(*) from lightnings;'
  db.get(query, [], (err, row) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`${req.hostname} successfully retrieved count`)
      res.json({
        'status': 'ok',
        'data': row['count(*)'],
      })
    }
  })
})
