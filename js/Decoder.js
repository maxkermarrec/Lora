
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

$(function() {
        $("#convert").click(function() {
       DecodePayload($('#inputData').val());

       });
});