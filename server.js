'use strict';

const express = require('express')
const app = express()
const request = require('request');
const signature = require(`./signature`);
const customer_notification = require(`./customer_notification`);
const bodyParser = require("body-parser");
const CustomerNotification = require('./customer_notification');

let API_KEY = "test";
let API_SECRET = "test=";
let CUSTOMER_ID = "test=";

app.use(bodyParser.json());

app.get('/calculate/:num1/:num2', (req, res) => {
    let num1 = req.params.num1;
    let num2 = req.params.num2;
    let result = Number(num1) + Number(num2);
    console.log('num1 ' + num1)
    console.log('num2 ' + num2)
    console.log('Sum ' + result)
    res.send({result});
})

app.use(bodyParser.json())
app.post("/hook", (req, res) => {
    let customers = req;  
    console.log(`customers: ${JSON.stringify(req.body)}`);
    console.log(`customers: ${JSON.stringify(req.headers)}`);
    console.log(`query: ${JSON.stringify(req.query)}`);
    console.log("current list", customers)
    //------------------------------------------------------
    console.log("------------------------------");
    console.log(`body:\n ${JSON.stringify(req.body)}`);
    console.log("------------------------------");
    console.log(`Payer:\n ${JSON.stringify(req.body.Payer)}`);
    console.log("------------------------------");
    let customerNotificationHelper = new customer_notification("","");
    customerNotificationHelper.InvokeZohoFunction(req.body);
    //------------------------------------------------------
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(customers.query));
})

app.get('/customers/:key/:secret', (req, res) => {
  API_KEY = req.params.key;
  API_SECRET = req.params.secret;
  const customerNotificationHelper = new customer_notification(API_KEY, API_SECRET);
  const result = customerNotificationHelper.getCustomers();
  let customers;
  result.then((data) => {
    customers = data;  
    console.log(`customers: ${JSON.stringify(customers)}`);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(customers));
  })

})

app.get('/hextobase64/:key/:secret', (req, res) => {
  API_KEY = req.params.key;
  API_SECRET = req.params.secret;
  const signatureHelper = new signature(API_KEY,API_SECRET);
  const signatureResult = signatureHelper.calculate();
  const headers = signatureResult.getHTTPHeaders();
  let result = headers;
  //console.log("Autorization done");
  res.send({result});
})

app.get('/setupnotification/:key/:secret/:cid', (req, res) => {
  API_KEY = req.params.key;
  API_SECRET = req.params.secret;
  CUSTOMER_ID = req.params.cid;
  const customerNotificationHelper = new customer_notification(API_KEY, API_SECRET);
  const result = customerNotificationHelper.setUpNotification(CUSTOMER_ID);
  let notification;
  notification = result.then((data) => {
    console.log(`notification: ${JSON.stringify(data)}`);
    //console.log("result " + result.Authorization);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  });
})

app.get('/setupnotificationout/:key/:secret/:cid', (req, res) => {
  API_KEY = req.params.key;
  API_SECRET = req.params.secret;
  CUSTOMER_ID = req.params.cid;
  const customerNotificationHelper = new customer_notification(API_KEY, API_SECRET);
  const result = customerNotificationHelper.setUpNotificationPayOut(CUSTOMER_ID);
  let notification;
  notification = result.then((data) => {
    console.log(`notification: ${JSON.stringify(data)}`);
    //console.log("result " + result.Authorization);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  });
})

app.post('/updatenotification/:key/:secret/:cid/:notid', (req, res) => {
  API_KEY = req.params.key;
  API_SECRET = req.params.secret;
  CUSTOMER_ID = req.params.cid;
  let notification_id = req.params.notid
  const customerNotificationHelper = new customer_notification(API_KEY, API_SECRET);
  const result = customerNotificationHelper.updateNotification(CUSTOMER_ID, notification_id);
  let notification;
  notification = result.then((data) => {
    console.log(`notification: ${JSON.stringify(data)}`);
    //console.log("result " + result.Authorization);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  });
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})

