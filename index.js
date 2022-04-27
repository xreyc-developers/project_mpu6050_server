const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, { cors: { origin: "http://localhost:3000" }});
const cors = require('cors');

app.use(cors());
let isPositive = true;

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