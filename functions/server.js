
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
  maxNetworkRetries: 2,
});


//const inventory = require('./data/products.json');


exports.handler = async (event, context, callback) => { //= async (event) =>

  // const { sku, quantity } = JSON.parse(event.body);

  // const product = inventory.find((p) => p.sku === sku);

  // const validatedQuantity = quantity > 0 && quantity < 11 ? quantity : 1;

  ///////////////////////////
  //////////////////////////
  /////////////////////////
  

const data = JSON.parse(event.body);
  
console.log(event.body);

const cart = JSON.parse(data);
const len = cart.length;


var totalCount = 0.0;
var totalCart = 0.0;

console.log(typeof(cart), len, cart);

for (i = 0; i < len; i++) {
  console.log("Cart: ", cart[i]);
  totalCount += cart[i].count ;
  totalCart += parseFloat( cart[i].total );
}

console.log("totalCount,  totalCart: ", totalCount, totalCart);
//var vtotal = cart[0].total;
//console.log("cart.total: ", vtotal);
var vtotal = (totalCart).toFixed(2);
totalCart = parseInt(vtotal * 100);
console.log("totalCount,  totalCart: ", totalCount, totalCart);

///////////////////////////
//////////////////////////
/////////////////////////

  const paymentIntent = await stripe.paymentIntents.create({
    description: 'Software development services',
    shipping: {
      name: 'Jenny Rosen',
      address: {
        line1: '510 Townsend St',
        postal_code: '98140',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
      },
    },
    amount: totalCart,
    currency: "usd",
    payment_method_types: ['card'],
  });

  var customer = await stripe.customers.create({
  name: 'Jenny Rosen',
  address: {
    line1: '510 Townsend St',
    postal_code: '98140',
    city: 'San Francisco',
    state: 'CA',
    country: 'US',
  }
});


  console.log("clientSecret: ", paymentIntent.client_secret);
  
  return {
    statusCode: 200,
    headers: {"Access-Control-Allow-Origin":"*"},
    body: JSON.stringify({
      //sessionId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }),
  };

  
};
