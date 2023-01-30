const express = require('express')
const app = express()
const CryptoJS = require("crypto-js");
var encodeURISafe = require('encodeuri-safe');

app.get('/calculate/:num1/:num2', (req, res) => {
    let num1 = req.params.num1;
    let num2 = req.params.num2;
    let result = Number(num1) + Number(num2);
    console.log('num1 ' + num1)
    console.log('num2 ' + num2)
    console.log('Sum ' + result)
    res.send({result});
})

app.get('/hextobase64/:hmac', (req, res) => {
  let hmac = req.params.hmac;
  console.log("hmac " + hmac);
  const hmacEncoded = hexToBase64(hmac.toString());
  let result = hmacEncoded;
  console.log('hmacEncoded ' + hmacEncoded)
  res.send({result});
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})

function hexToBase64(hexstring) {
  console.log("hexToBase64");
  return btoa(hexstring.match(/\w{2}/g).map(function(a) {
      return String.fromCharCode(parseInt(a, 16));
  }).join(""));
}
