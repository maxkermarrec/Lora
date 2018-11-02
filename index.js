const express = require('express');
var bodyParser = require("body-parser");
const path = require('path')
const PORT = process.env.PORT || 5000

var server = express();
	server.use(bodyParser.urlencoded({ extended: true }))
	.use(express.static(path.join(__dirname, 'views')))
	.set('js', path.join(__dirname, 'js'))
  	.set('view engine', 'ejs')
	.get('/', (req, res) => res.render('pages/index'))
  	.listen(PORT, () => console.log(`Listening on ${ PORT }`));

server.post('/users', function(request, response) {
	var data = JSON.stringify(request.body); //Doit contenir les logs recues depuis thingpark
	console.log(data);
});