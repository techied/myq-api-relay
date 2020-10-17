'use strict';

const express = require('express');

// Constants
const PORT = process.env.PORT;
const HOST = '0.0.0.0';
const MYQ_EMAIL = process.env.MYQ_EMAIL;
const MYQ_PASSWORD = process.env.MYQ_PASSWORD;
const MYQ_SERIAL_NUMBER = process.env.MYQ_SERIAL_NUMBER;


// App
const app = express();
const MyQ = require('myq-api');
const account = new MyQ();


app.get('/', (req, res) => {
  res.send('OK');
});

app.get('/open', (req, res) => {
  account.login(MYQ_EMAIL, MYQ_PASSWORD)
  .then(function(result) {
    return account.setDoorState(MYQ_SERIAL_NUMBER, MyQ.actions.door.OPEN)
  }).then(function (result) {
    console.log(result);
  }).catch(function (error) {
    console.error(error);
  });
  res.send('OK');
})

app.get('/close', (req, res) => {
  account.login(MYQ_EMAIL, MYQ_PASSWORD)
  .then(function(result) {
    return account.setDoorState(MYQ_SERIAL_NUMBER, MyQ.actions.door.CLOSE)
  }).then(function (result) {
    console.log(result);
  }).catch(function (error) {
    console.error(error);
  });
  res.send('OK');
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);