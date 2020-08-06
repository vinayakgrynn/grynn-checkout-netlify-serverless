
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
  maxNetworkRetries: 2,
});

exports.handler = async (event, context, callback) => { //= async (event) =>

//const data = JSON.parse(event.body);
  
//console.log(event.body);

//const cart = JSON.parse(data);

//const len = cart.length;

var email = "vinayak.patel@grynn.in";
  
  
const https = require('https');

const options = {
    hostname: 'https://api.stripe.com/v1/search?query=" + email + "&prefix=false',
    path: '/get',
    headers: {
        "authorization": process.env.STRIPE_SECRET_KEY
    }
}

https.get(options, (response) => {

    var result = ''
    
    response.on('data', function (chunk) {
        result += chunk;
    });

    response.on('end', function () {
        console.log("https: ", result);
    });

});
  
  
  
  
  
  
  
  

const request = require('request');

const roptions = {
  url: 'https://api.stripe.com/v1/search?query="+email+"&prefix=false',
  headers: {
    "authorization": process.env.STRIPE_SECRET_KEY
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    const info = JSON.parse(body);
    console.log("Requests: ", info);
  }
  
  
  
}

request.get(roptions, callback);

  
return {
    statusCode: 200,
    headers: {"Access-Control-Allow-Origin":"*"},
    body: JSON.stringify({
      //sessionId: "Hello",
      //clientSecret: paymentIntent.client_secret,
      //publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }),
  };
  
};
