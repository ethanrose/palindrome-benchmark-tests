var path = require('path')
var express = require('express')
var app = express()


app.use(express.static(path.join(__dirname, '/client/build')))
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

app.listen(3002, function () {
  console.log(listening on port 3002!')
})