const express = require('express');
const app = express();

app.get('/', function (request, response) {
	response.send('Hello World!');
});

app.listen(1337, function () {
	console.log('Example app listening on port 1337!');
});
