
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
  
  cart = [];

  cart = JSON.parse(event.body);
  
  // Count cart 
  var totalCount = 0;
  var totalCart = 0;

  for (var item in cart) {
      console.log(item, cart[item]);
      totalCount += cart[item].count;
      totalCart += cart[item].price * cart[item].count;
  }

  console.log("totalCount: ", totalCount);
  console.log("totalCart: ", totalCart);


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
