'use strict';

const signature = require(`./signature`);
const fetch = require("node-fetch");

class CustomerNotification {
    constructor (key, secret)
    {
        this.key = key;
        this.secret = secret;
        console.debug(`this.key ${this.key}`);
        console.debug(`this.secret ${this.secret}`);
        this.contacts = null;
    }

    async setUpNotification(cid)
    {
        let CUSTOMER_ID = cid;
        console.debug(`CUSTOMER_ID ${CUSTOMER_ID}`);
        const signatureHelper = new signature(this.key,this.secret);
        const signatureResult = signatureHelper.calculate();
        const headersOPt = signatureResult.getHTTPHeadersNotificationd();
        console.log(`headersOPt ${JSON.stringify(headersOPt)}`);
        //const options = {method: 'GET', headers: headersOPt};

        const options = {
            method: 'POST',
            headers: headersOPt,
            body: JSON.stringify({
              destinations: ['http://localhost:3000/calculate/3/2'],
              config: {
                retry: true,
                secret: 'sdtrraz4wedsTq4xrfdcvazdsE4Tfdfd',
                hmacAlgorithm: 'hmac-sha256'
              },
              channel: 'WEBHOOK',
              type: 'PAYIN'
            })
          };
        console.log(`options ${JSON.stringify(options)}`);

        let customer_notification =  await fetch(`https://api.modulrfinance.com/api/customers/${CUSTOMER_ID}/notifications`, options)
            .then(response => response.json())
            .then(response => {
                let notif = response;
                //console.log(response)
                console.log(`customers notification: ${JSON.stringify(response)}`);
                return notif;
            })
            .catch(err => console.error(err));
        return customer_notification;
    }

    async getCustomers()
    {
        const signatureHelper = new signature(this.key,this.secret);
        const signatureResult = signatureHelper.calculate();
        const headersOPt = signatureResult.getHTTPHeaders();
        console.log(`headersOPt ${JSON.stringify(headersOPt)}`);
        const options = {method: 'GET', headers: headersOPt};
        console.log(`options ${JSON.stringify(options)}`);

        let customers = await fetch('https://api.modulrfinance.com/api/customers', options)
            .then(response => response.json())
            .then(response => {
                console.log(`customers: ${JSON.stringify(response)}`);
                this.contacts = response;
                return response;
            })
            .catch(err => console.error(err));
        return customers;
    }
}
module.exports = CustomerNotification;