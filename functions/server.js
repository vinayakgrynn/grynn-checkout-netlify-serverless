
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
  maxNetworkRetries: 2,
});


//const inventory = require('./data/products.json');


exports.handler = async (event, context, callback) => { //= async (event) =>

  // const { sku, quantity } = JSON.parse(event.body);

  // const product = inventory.find((p) => p.sku === sku);

  // const validatedQuantity = quantity > 0 && quantity < 11 ? quantity : 1;


  console.log(event.body);


  ///////////////////////////
  //////////////////////////
  /////////////////////////
  

const ss = event.body;
const vv = JSON.parse(ss);
const cart = JSON.parse(event.body).payload;
const len = cart.length;

console.log(typeof(ss), typeof(vv), typeof(cart), typeof(cart[0]));

console.log(" cart.length, cart , querystring.parse(event.body) " , cart.length , cart, querystring.parse(event.body));

var totalCount = 0;
var totalCart = 0;


for (i = 0; i < len; i++) {
  console.log("Cart: ", cart[i]);
  totalCount += cart[i].count;
  totalCart += cart[i].price;
}

console.log("totalCount,  totalCart: ", totalCount, totalCart);



  ///////////////////////////
  //////////////////////////
  /////////////////////////


  const paymentIntent = await stripe.paymentIntents.create({
    amount: 15,
    currency: "usd"
  });



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
