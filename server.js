var path = require('path')
var port = process.env.PORT || 30012
var express = require('express')
var app = express()


app.use(express.static(path.join(__dirname, '/client/build')))
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

app.listen(port, function() {
  console.log('Listening on port: ' + port)
})