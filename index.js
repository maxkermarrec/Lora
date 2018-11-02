const express = require('express');
var bodyParser = require("body-parser");
var util = require('util');
const path = require('path')
const PORT = process.env.PORT || 5000

var server = express();
	server.use(bodyParser.urlencoded({ extended: true }))
	.use(express.static(path.join(__dirname, 'views')))
	.set('js', path.join(__dirname, 'js'))
  	.set('view engine', 'ejs')
	.get('/', (req, res) => res.render('pages/index'))
  	.listen(PORT, () => console.log(`Listening on ${ PORT }`));

server.get('/users', function(request, response) {
	var devEui = request.param("LrnDevEui");
	console.log("DevEui des données reçues : " + devEui);
	response.render('pages/users');
});

server.post('/users', function(request, response) {
	var devEui = request.param("LrnDevEui");
	var port = request.param("LrnFPort");
	var infos = request.param("LrnInfos");
	console.log("DevEui des données reçues : " + devEui + "  Port : " + port +
		"  Infos : " + infos);
	//Doit contenir les logs recues depuis thingpark
	console.log("data : " + util.inspect(request));
});