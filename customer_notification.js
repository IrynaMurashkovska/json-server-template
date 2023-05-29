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

        const options = {
            method: 'POST',
            headers: headersOPt,
            body: JSON.stringify({
                destinations: ['https://nebeus.onrender.com/hook'],
                //destinations: ['https://www.zohoapis.eu/crm/v2/functions/modulr_webhook_notification_1/actions/execute?auth_type=apikey&zapikey=1003.2cb250d52697ca90ff6c9707870289bb.61ad36913f64b99109702d31ede9dc65'],
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

    async setUpNotificationPayOut(cid)
    {
        let CUSTOMER_ID = cid;
        console.debug(`CUSTOMER_ID ${CUSTOMER_ID}`);
        const signatureHelper = new signature(this.key,this.secret);
        const signatureResult = signatureHelper.calculate();
        const headersOPt = signatureResult.getHTTPHeadersNotificationd();
        console.log(`headersOPt ${JSON.stringify(headersOPt)}`);

        const options = {
            method: 'POST',
            headers: headersOPt,
            body: JSON.stringify({
                destinations: ['https://nebeus.onrender.com/hook'],
                //destinations: ['https://www.zohoapis.eu/crm/v2/functions/modulr_webhook_notification_1/actions/execute?auth_type=apikey&zapikey=1003.2cb250d52697ca90ff6c9707870289bb.61ad36913f64b99109702d31ede9dc65'],
              config: {
                retry: true,
                secret: 'sdtrraz4wedsTq4xrfdcvazdsE4Tfdfd',
                hmacAlgorithm: 'hmac-sha256'
              },
              channel: 'WEBHOOK',
              type: 'PAYOUT'
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

    async updateNotification(cid, notid)
    {
        let CUSTOMER_ID = cid;
        let NOTIFICATION_ID = notid;
        console.debug(`CUSTOMER_ID ${CUSTOMER_ID}`);
        const signatureHelper = new signature(this.key,this.secret);
        const signatureResult = signatureHelper.calculate();
        const headersOPt = signatureResult.getHTTPHeadersNotificationd();
        console.log(`headersOPt ${JSON.stringify(headersOPt)}`);

        const options = {
            method: 'PUT',
            headers: headersOPt,
            body: JSON.stringify({
                //destinations: ['https://www.zohoapis.eu/crm/v2/functions/modulr_webhook_notification_1/actions/execute?auth_type=apikey&zapikey=1003.2cb250d52697ca90ff6c9707870289bb.61ad36913f64b99109702d31ede9dc65'],
                destinations: ['https://nebeus.onrender.com/hook'],
              config: {
                retry: true,
                secret: 'sdtrraz4wedsTq4xrfdcvazdsE4Tfdfd',
                hmacAlgorithm: 'hmac-sha256'
              },
              channel: 'WEBHOOK',
              type: 'PAYIN',
              status: 'ACTIVE'
            })
          };
        console.log(`options ${JSON.stringify(options)}`);

        let customer_notification =  await fetch(`https://api.modulrfinance.com/api/customers/${CUSTOMER_ID}/notifications/${NOTIFICATION_ID}`, options)
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

    async updateNotificationPayOut(cid, notid)
    {
        let CUSTOMER_ID = cid;
        let NOTIFICATION_ID = notid;
        console.debug(`CUSTOMER_ID ${CUSTOMER_ID}`);
        const signatureHelper = new signature(this.key,this.secret);
        const signatureResult = signatureHelper.calculate();
        const headersOPt = signatureResult.getHTTPHeadersNotificationd();
        console.log(`headersOPt ${JSON.stringify(headersOPt)}`);

        const options = {
            method: 'PUT',
            headers: headersOPt,
            body: JSON.stringify({
                //destinations: ['https://www.zohoapis.eu/crm/v2/functions/modulr_webhook_notification_1/actions/execute?auth_type=apikey&zapikey=1003.2cb250d52697ca90ff6c9707870289bb.61ad36913f64b99109702d31ede9dc65'],
                destinations: ['https://nebeus.onrender.com/hook'],
              config: {
                retry: true,
                secret: 'sdtrraz4wedsTq4xrfdcvazdsE4Tfdfd',
                hmacAlgorithm: 'hmac-sha256'
              },
              channel: 'WEBHOOK',
              type: 'PAYOUT',
              status: 'ACTIVE'
            })
          };
        console.log(`options ${JSON.stringify(options)}`);

        let customer_notification =  await fetch(`https://api.modulrfinance.com/api/customers/${CUSTOMER_ID}/notifications/${NOTIFICATION_ID}`, options)
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

    async getNotificationCustomers(cid)
    {
        let CUSTOMER_ID = cid;
        console.debug(`CUSTOMER_ID ${CUSTOMER_ID}`);
        const signatureHelper = new signature(this.key,this.secret);
        const signatureResult = signatureHelper.calculate();
        const headersOPt = signatureResult.getHTTPHeadersNotificationd();
        console.log(`headersOPt ${JSON.stringify(headersOPt)}`);

        const options = {
            method: 'GET',
            headers: headersOPt
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

    async InvokeZohoFunction(body)
    {
        const options = {
            method: 'GET',
            type: 'GET',
            //parameters:{"inf": body}
        };
        console.log(`options ${JSON.stringify(options)}`);

        let customers = await fetch(`https://www.zohoapis.eu/crm/v2/functions/modulr_webhook_notification_1/actions/execute?auth_type=apikey&zapikey=1003.2cb250d52697ca90ff6c9707870289bb.61ad36913f64b99109702d31ede9dc65&inf=${JSON.stringify(body)}`, options)
            .then(response => response.json())
            .then(response => {
                console.log(`TEST ZOHO: ${JSON.stringify(response)}`);
                this.contacts = response;
                return response;
            })
            .catch(err => console.error(err));
        return customers;
    }
}
module.exports = CustomerNotification;