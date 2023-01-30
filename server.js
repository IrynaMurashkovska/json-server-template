'use strict';

const express = require('express')
const app = express()
//const crypto = require("crypto-js");
////const encodeURISafe = require('encodeuri-safe');
//const btoa = require('btoa');
const signature = require(`./signature`);

let API_KEY = "test";
let API_SECRET = "test=";

app.get('/calculate/:num1/:num2', (req, res) => {
    let num1 = req.params.num1;
    let num2 = req.params.num2;
    let result = Number(num1) + Number(num2);
    console.log('num1 ' + num1)
    console.log('num2 ' + num2)
    console.log('Sum ' + result)
    res.send({result});
})

app.get('/hextobase64/:key/:secret', (req, res) => {
  API_KEY = req.params.key;
  API_SECRET = req.params.secret;
  const signatureHelper = new signature(API_KEY,API_SECRET);
  const signatureResult = signatureHelper.calculate();
  let result = signatureResult;
  console.log("result " + result);
  res.send({result});
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})

