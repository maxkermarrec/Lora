const express = require('express');
var bodyParser = require("body-parser");
var util = require('util');
const path = require('path')
const PORT = process.env.PORT || 5000

function DecodePayloadToString(hex) {
    const frame_type = [];
    const current_summation = [];
    const supplay_status = [];
    const status = [];
    const unit_measure = [];
    const divisor = [];
    const summation_formating = [];
    const metering_device = [];
    var string = 'the payload received for the sensor is '+hex;
    var myConvertedData=0;
    for (var c = 0; c < hex.length; c++){
      //  bytes.push(hex.substr(c, 2));

        if(c >= 0 && c < 2){
            frame_type.push((hex.substr(c, 2)));
            c+=1;
        }
        else if (c >=2  && c < 14){
            current_summation.push((hex.substr(c, 12)));
            myConvertedData= msbFix(current_summation);
            string += '\nThe value from hex to decimal of the electrical consumption '+myConvertedData/1000+' kWh';
            c+=11;
        }
        else if (c >=14  && c < 16){
            supplay_status.push((hex.substr(c, 2)));
            c+=1;
        }

        else if (c >=16  && c < 18){
            status.push((hex.substr(c, 2)));
            c+=1;
        }
        else if (c >=18  && c < 20){
            unit_measure.push((hex.substr(c, 2)));
            c+=1;
        }
        else if (c >=20  && c < 26){
            divisor.push((hex.substr(c, 6)));
            myConvertedData= msbFix(divisor);
            string += '\nThe value from hex to decimal of the consumption unit '+myConvertedData;

            c+=5;
        }

    }
}



function DecodePayload(hex) {

    const frame_type = [];
    const current_summation = [];
    const supplay_status = [];
    const status = [];
    const unit_measure = [];
    const divisor = [];
    const summation_formating = [];
    const metering_device = [];
    console.log('the payload received for the sensor is '+hex);
    var myConvertedData=0;
    for (var c = 0; c < hex.length; c++){
      //  bytes.push(hex.substr(c, 2));

        if(c >= 0 && c < 2){
            frame_type.push((hex.substr(c, 2)));
            c+=1;
        }
        else if (c >=2  && c < 14){
            current_summation.push((hex.substr(c, 12)));
            myConvertedData= msbFix(current_summation);
            console.log('The value from hex to decimal of the electrical consumption '+myConvertedData/1000+' kWh') ;
            c+=11;
        }
        else if (c >=14  && c < 16){
            supplay_status.push((hex.substr(c, 2)));
            c+=1;
        }

        else if (c >=16  && c < 18){
            status.push((hex.substr(c, 2)));
            c+=1;
        }
        else if (c >=18  && c < 20){
            unit_measure.push((hex.substr(c, 2)));
            c+=1;
        }
        else if (c >=20  && c < 26){
            divisor.push((hex.substr(c, 6)));
            myConvertedData= msbFix(divisor);
            console.log('The value from hex to decimal of the consumption unit '+myConvertedData) ;

            c+=5;
        }

    }
}


function msbFix(buffer){
    var data='';
    var chunk=0;//chunk of two elements
    console.log('////////////////////////////////VALUE CONVERSION/////////////////////////////////');
    for (var i=buffer[0].length-1; i>=0; i=buffer[0].length-1-chunk){
        data+=buffer[0].substr(i-1,2);
        chunk+=2;

    }
    console.log('The value in ex MSB format '+data);
    
    return parseInt(data,16);
}

var server = express();
	server.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json())
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
	var payload = request.body.DevEUI_uplink.payload_hex;
	console.log("DevEui des données reçues : " + devEui + "  Port : " + port +
		"  Infos : " + infos);
	//Doit contenir les logs recues depuis thingpark
	console.log("body stringified : " + JSON.stringify(request.body));
	console.log("payload_hex : " + payload);
	console.log("Données du capteur : " + DecodePayload(payload));
});