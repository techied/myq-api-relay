const MyQ = require('myq-api');

const express = require('express');

const EMAIL = process.env.MYQ_EMAIL;
const PASSWORD = process.env.MYQ_PASSWORD;

const SERIALNO1 = process.env.MYQ_SERIAL_NUMBER;

const account = new MyQ();

const PORT = process.env.PORT;
const HOST = '0.0.0.0';
const TOKEN = process.env.TOKEN;

const app = express();

app.use('/', async (req, res, next) => {
  if(req.headers['token'] == TOKEN)
    next()
  else
    next('/')
})

app.get('/', async (req, res) => {
  res.send('OK');
})

app.get('/open', async (req, res) => {
  
  await setDoor(true);
  res.send('OK');
})

app.get('/close', async (req, res) => {
  await setDoor(false);
  res.send('OK');
})

const setDoor = async (open) => {
  await account
  .login(EMAIL, PASSWORD)
  .then((loginResult) => {
    console.log('Login result:');
    console.log(JSON.stringify(loginResult, null, 2));
    console.log(`Short-lived security token: '${loginResult.securityToken}'`);
    if(open) {
      account.setDoorState(SERIALNO1, MyQ.actions.door.OPEN);
    } else {
      account.setDoorState(SERIALNO1, MyQ.actions.door.CLOSE);
    }
  })
  .catch((error) => {
    console.error('Error received:');
    console.error(error);
    console.error(`Error code: ${error.code}`);
    console.error(`Error message: ${error.message}`);
  });
}

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);