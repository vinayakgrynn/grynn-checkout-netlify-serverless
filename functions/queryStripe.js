
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
  maxNetworkRetries: 2,
});

exports.handler = async (event, context, callback) => { //= async (event) =>

const data = JSON.parse(event.body);
  
console.log(event.body);

//const cart = JSON.parse(data);

//const len = cart.length;

var email = "vinayak.patel@grynn.in";

const request = require('request');

const options = {
  url: 'https://api.stripe.com/v1/search?query="+email+"&prefix=false',
  headers: {
    "authorization": process.env.STRIPE_SECRET_KEY
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    const info = JSON.parse(body);
    console.log(info.stargazers_count + " Stars");
    console.log(info.forks_count + " Forks");
  }
  
  return {
    statusCode: 200,
    headers: {"Access-Control-Allow-Origin":"*"},
    body: JSON.stringify({
      //sessionId: paymentIntent.id,
      //clientSecret: paymentIntent.client_secret,
      //publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }),
  };
  
}

request.get(options, callback);

  
};
