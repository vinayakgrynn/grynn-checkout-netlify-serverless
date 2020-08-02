
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

  var obj = {};
  
  
  // Count cart 
  var totalCount = 0;
  for (var item in cart) {
      totalCount += cart[item].count;
  }
  

  // Total cart
  var totalCart = 0;
  for (var item in cart) {
      totalCart += cart[item].price * cart[item].count;
  }
  totalCart = Number(totalCart.toFixed(2));
  

  // List cart
  var cartCopy = [];
  for (i in cart) {
      item = cart[i];
      itemCopy = {};
      for (p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy);
  }
    
  
  console.log("totalCount: ", totalCount);
  console.log("totalCart: ", totalCart);
  console.log("cartCopy: ", cartCopy);


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
