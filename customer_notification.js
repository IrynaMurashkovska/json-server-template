'use strict';

const signature = require(`./signature`);

class CustomerNotification {
    constructor (cid)
    {
        this.cid = cid;
        console.debug(`this.cid ${this.cid}`);
    }

    setUpNotification(key, secret, cid)
    {
        let API_KEY = key;
        let API_SECRET = secret;
        let CUSTOMER_ID = cid;
        console.debug(`API_KEY ${API_KEY}`);
        console.debug(`API_SECRET ${API_SECRET}`);
        console.debug(`CUSTOMER_ID ${CUSTOMER_ID}`);
        const signatureHelper = new signature(API_KEY,API_SECRET);
        const signatureResult = signatureHelper.calculate();
        const headersOPt = signatureResult.getHTTPHeadersNotificationd();
       // let result = headers;
       /*
        let headersOPt = {
            'accept': 'application/json',
            'content-type': 'application/json',
            'Authorization': signatureResult.getAutorisations()
        };
        */
        //console.log("result " + result.Authorization);
        console.log(`headers ${JSON.stringify(headersOPt)}`);

        const options = {
            method: 'POST',
            headers: headersOPt,
            body: JSON.stringify({destinations: ['http://localhost:3000/calculate/3/2'], channel: 'WEBHOOK', type: 'PAYIN', retry: true, secret: 'sdtrraz4wedsTq4xrfdcvazdsE4Tfdfd', hmacAlgorithm: 'hmac-sha256'})
          };

          console.log(`options ${JSON.stringify(options)}`);

          fetch(`https://api.modulrfinance.com/api/customers/${CUSTOMER_ID}/notifications`, options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }

}
module.exports = CustomerNotification;