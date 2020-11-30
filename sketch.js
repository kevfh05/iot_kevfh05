
let btnActivar;
let btnApagar;
let estadoFondo = false;

let BrokerMQTT = 'broker.shiftr.io';
let PuertoMQTT = 80;
let ClienteIDMQTT = "Pagina-"+Math.floor(Math.random() * 1000);
let UsuarioMQTT = "dataKevfh05";
let ContrasenaMQTT = "12345678";

client = new Paho.MQTT.Client(BrokerMQTT, PuertoMQTT, ClienteIDMQTT);

client.onConnectionLost = MQTTPerder;
client.onMessageArrived = MQTTMensaje;

client.connect({
  onSuccess: CuandoConectadoMQTT,
  userName: UsuarioMQTT,
  password: ContrasenaMQTT
});

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

function CuandoConectadoMQTT() {
  console.log("MQTT Conectado");
   client.subscribe("/data/Boton");
}

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
}

function ApagarLed(){
console.log("Apagando Led");
}

function draw() {
if (estadoFondo) {
  background(0);
}
else {
  background(255);
}
}
