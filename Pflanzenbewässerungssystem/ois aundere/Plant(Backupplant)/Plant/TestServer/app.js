const express = require('express')
const app = express()
const port = 3000

app.get('/increaseDaysPump1', (req, res) => {
  res.status(200).send("Hallo, ich bin eine Pflanze oder so.")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
