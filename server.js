const express = require('express')
const serveStatic = require('serve-static')
const db = require('./database.js')

// CONFIG
const PORT = 8080
// For safety reasons a this predefined error message will be returned
// instead of a detailed stack trace
const ERR_MESSAGE = 'An error occurred'
// Authorization key is used for write operations:
const AUTHORIZATION_KEY = 'YOUR_AUTHORIZATION_KEY_GOES_HERE'

const app = express()
app.use(serveStatic('./dist'))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

/* API ENDPOINTS */

// test endpoint
app.get('/api/', (req, res, next) => {
  // console.log(`API REQUEST: ${req.hostname} ${req.method} ${req.originalUrl}`)
  res.json({ 'status': 'ok' })
})

// latest - retrieve the latest x records
app.get('/api/latest/:amount', (req, res, next) => {
  // console.log(`API REQUEST: ${req.hostname} ${req.method} ${req.originalUrl}`)
  const amount = req.params.amount
  const all = (amount === 'all')

  let query = 'SELECT * FROM lightnings ORDER BY date DESC'
  if (all) query = `${query} LIMIT ?`

  db.all(query + ';', (all) ? [] : [amount], (err, rows) => {
    if (err) {
      // console.error(err.message)
      res.json({ 'status': 'error', 'message': ERR_MESSAGE })
    } else {
      const length = rows.length
      // console.log(`${req.hostname} successfully retrieved ${length} rows`)
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
  // console.log(`API REQUEST: ${req.hostname} ${req.method} ${req.originalUrl}`)

  const query = 'select count(*) from lightnings;'
  db.get(query, [], (err, row) => {
    if (err) {
      console.error(err)
    } else {
      // console.log(`${req.hostname} successfully retrieved count`)
      res.json({
        'status': 'ok',
        'data': row['count(*)'],
      })
    }
  })
})

app.post('/api/update/:key', (req, res, next) => {
  if (req.params.key !== AUTHORIZATION_KEY) {
    res.status = 404
    res.json({
      'status': 'error',
      'error': 'Error 404: Not found',
    })
  } else {
    res.json({
      'status': 'ok',
      'message': 'Authorization successful',
    })
  }
  const query = 'insert into lightnings (LATITUDE, LONGITUDE, DATE) values (?, ?, ?);'
  // eslint-disable-next-line prefer-const
  for (let param of req.body.data) {
    db.run(query, [param.LATITUDE, param.LONGITUDE, param.DATE])
  }
})

