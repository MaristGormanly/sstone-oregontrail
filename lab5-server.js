const express = require('express', 4.16.1);
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(1337, function() {
  console.log('Example app listening on 1337');
});
