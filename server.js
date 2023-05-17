'use strict';

const express = require('express')
const app = express()
const request = require('request');
const signature = require(`./signature`);
const customer_notification = require(`./customer_notification`);

let API_KEY = "test";
let API_SECRET = "test=";
let CUSTOMER_ID = "test=";

app.get('/calculate/:num1/:num2', (req, res) => {
    let num1 = req.params.num1;
    let num2 = req.params.num2;
    let result = Number(num1) + Number(num2);
    console.log('num1 ' + num1)
    console.log('num2 ' + num2)
    console.log('Sum ' + result)
    res.send({result});
})

app.get('/customers/:key/:secret', (req, res) => {
  API_KEY = req.params.key;
  API_SECRET = req.params.secret;
  const customerNotificationHelper = new customer_notification(API_KEY, API_SECRET);
  const result = customerNotificationHelper.getCustomers();
  console.log("server result: " + result);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(result));

})

app.get('/hextobase64/:key/:secret', (req, res) => {
  API_KEY = req.params.key;
  API_SECRET = req.params.secret;
  const signatureHelper = new signature(API_KEY,API_SECRET);
  const signatureResult = signatureHelper.calculate();
  const headers = signatureResult.getHTTPHeaders();
  let result = headers;
  console.log("result " + result.Authorization);
  res.send({result});
})

app.get('/setupnotification/:key/:secret/:cid', (req, res) => {
  API_KEY = req.params.key;
  API_SECRET = req.params.secret;
  CUSTOMER_ID = req.params.cid;
  const customerNotificationHelper = new customer_notification(API_KEY, API_SECRET);
  const result = customerNotificationHelper.setUpNotification(CUSTOMER_ID);
  console.log("result " + result.Authorization);
  res.send({result});
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})

