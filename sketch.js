
let btnActivar;
let btnApagar;
let estadoFondo = false;

// let BrokerMQTT = 'broker.shiftr.io';
// let PuertoMQTT = 443;
 let ClienteIDMQTT = "Pagina-"+Math.floor(Math.random() * 1000);
// let UsuarioMQTT = "dataKevfh05";
// let ContrasenaMQTT = "12345678";
//
// client = new Paho.MQTT.Client(BrokerMQTT, PuertoMQTT,'/mqtt-wss', ClienteIDMQTT);

var client = mqtt.connect('wss://kevfh05~kevfh05@broker.shiftr.io', {
  clientId: ClienteIDMQTT
});

// client.onConnectionLost = MQTTPerder;
// client.onMessageArrived = MQTTMensaje;


function MQTTPerder(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("MQTT Perdio coneccion Error:" + responseObject.errorMessage);
  }
}

function MQTTMensaje(message) {
  console.log("Mensaje recibido:" + message.payloadString);
  if (message.payloadString == '1') {
    estadoFondo = true;
  }else {
    estadoFondo = false;
  }
}

// function CuandoConectadoMQTT() {
//   console.log("MQTT Conectado");
//    client.subscribe("/data/Boton");
// }

client.on('connect', function () {
  console.log('connected');
  client.subscribe("/data/Boton");
})

function setup() {
  createCanvas(200, 200);
  createP();
  btnActivar = createButton("Activar Led");
  btnApagar = createButton("Apagar Led");
  btnActivar.mousePressed(ActivarLed);
  btnApagar.mousePressed(ApagarLed);
}

function ActivarLed(){
console.log("Encendiendo Led");
message = new Paho.MQTT.Message("1");
message.destinationName = "/data/Led";
client.send(message);
}

function ApagarLed(){
console.log("Apagando Led");
message = new Paho.MQTT.Message("0");
message.destinationName = "/data/Led";
client.send(message);
}

function draw() {
if (estadoFondo) {
  background(0);
}
else {
  background(255);
}
}
