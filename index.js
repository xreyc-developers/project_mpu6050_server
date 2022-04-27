const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, { cors: { origin: "http://192.168.1.241:3000" }});
const cors = require('cors');
// MPU
var i2c = require('i2c-bus');
var MPU6050 = require('i2c-mpu6050');

var address = 0x68;
var i2c1 = i2c.openSync(1); 
var sensor = new MPU6050(i2c1, address);
var data = sensor.readSync();
console.log(data);

app.use(cors());
let isPositive = true;

app.get('/', function(req, res) {
   res.send('Hello World!')
 });

setInterval(() => {
   const newValueX = Math.round(Math.random() * 1000);
   const newValueY = Math.round(Math.random() * 1000);
   const newValueZ = Math.round(Math.random() * 1000);
   const newValueAcceleration = Math.round(Math.random() * 1000);
   const magnitude = Math.sqrt((newValueX * newValueX) + (newValueY * newValueY) + (newValueZ * newValueZ));
   isPositive = !isPositive;
   io.emit('receive-counter', {
      x: isPositive ? newValueX : -newValueX,
      y: isPositive ? newValueY : -newValueY,
      z: isPositive ? newValueZ : -newValueZ,
      a: isPositive ? newValueAcceleration : -newValueAcceleration,
      m: magnitude
   });
}, 1);

http.listen(4000, function() { console.log('listening on 4000'); });