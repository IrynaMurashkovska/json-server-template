'use strict';

const signature = require(`./signature`);

class CustomerNotification {
    constructor (key, secret)
    {
        this.key = key;
        this.secret = secret;
        console.debug(`this.cid ${this.cid}`);
        console.debug(`this.key ${this.key}`);
        console.debug(`this.secret ${this.secret}`);
    }

    setUpNotification(cid)
    {
        let CUSTOMER_ID = cid;
        console.debug(`CUSTOMER_ID ${CUSTOMER_ID}`);
        const signatureHelper = new signature(this.key,this.secret);
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

    getCustomers()
    {

        const signatureHelper = new signature(this.key,this.secret);
        const signatureResult = signatureHelper.calculate();
        const headersOPt = signatureResult.getHTTPHeaders();
        console.log(`headersOPt ${JSON.stringify(headersOPt)}`);
        const options = {method: 'GET', headers: headersOPt};
        console.log(`options ${JSON.stringify(options)}`);

        fetch('https://api-sandbox.modulrfinance.com/api-sandbox-token/customers', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

        console.log(`response ${JSON.stringify(response)}`);

    }



}
module.exports = CustomerNotification;