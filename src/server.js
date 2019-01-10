var express = require('express');
var app = express();

// Serve all the files in '/dist' directory
app.use(express.static('dist'))

app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000!')
})