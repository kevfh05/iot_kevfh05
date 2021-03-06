
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
var client = mqtt.connect('wss://dataKevfh05:12345678@broker.shiftr.io', {
  clientId: ClienteIDMQTT,
  protocolVersion: 3,
  keepalive: 60,
reschedulePings: true,
protocolId: 'MQTT',
protocolVersion: 4,
reconnectPeriod: 1000,
connectTimeout: 30 * 1000,
clean: true
});

// client.onConnectionLost = MQTTPerder;
// client.onMessageArrived = MQTTMensaje;

client.on('error', function (err) {
  console.log(err)
  client.end()
})


// function MQTTMensaje(message) {
//   console.log("Mensaje recibido:" + message.payloadString);
//   if (message.payloadString == '1') {
//     estadoFondo = true;
//   }else {
//     estadoFondo = false;
//   }
// }

client.on('message', function (topic, message) {
  console.log(message.toString())
  if (message.toString() == '1') {
    estadoFondo = true;
  }else {
    estadoFondo = false;
  }
})

// function CuandoConectadoMQTT() {
//   console.log("MQTT Conectado");
//    client.subscribe("/data/Boton");
// }

client.on('connect', function () {
  console.log('connected');
  client.subscribe("/data/Boton");
})

// client.on('connect', function(){
//   console.log('client has connected!');
//
//   client.subscribe("/data/Boton");
//   // client.unsubscribe('/example');
//
//   setInterval(function(){
//     client.publish('/hello', 'world');
//   }, 1000);
// });

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
// message = new Paho.MQTT.Message("1");
// message.destinationName = "/data/Led";
// client.send(message);
client.publish('/data/Led', '1');
}

function ApagarLed(){
console.log("Apagando Led");
// message = new Paho.MQTT.Message("0");
// message.destinationName = "/data/Led";
// client.send(message);
client.publish('data/Led', '0');
}

function packetsend(packet) {
  console.log(packet);
}

function draw() {
if (estadoFondo) {
  background(0);
}
else {
  background(255);
}
}
