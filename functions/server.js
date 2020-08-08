
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
  

const datav = JSON.parse(event.body);
  
//console.log(event.body);

const data = JSON.parse(datav);
  
//console.log(data);
  
const address = data[0];
const cart = data[1];
const len = cart.length;

console.log("\naddress\n",typeof(address), address);
console.log("\ncart\n", typeof(cart), cart);

var totalCount = 0.0;
var totalCart = 0.0;

//console.log(typeof(cart), len, cart);

for (i = 0; i < len; i++) {
  console.log("Cart: ", cart[i]);
  totalCount += cart[i].count ;
  totalCart += parseFloat( cart[i].total );
}

console.log("totalCount,  totalCart: ", totalCount, totalCart);

var vtotal = (totalCart).toFixed(2);
totalCart = parseInt(vtotal * 100);
console.log("totalCount,  totalCart: ", totalCount, totalCart);

///////////////////////////
//////////////////////////
/////////////////////////

  const paymentIntent = await stripe.paymentIntents.create({
    description: 'Software development services',
    shipping: {
      name: address.firstname + " " + address.lastname ,
      phone: address.tel,
      address: {
        line1: address.ship-address + "  " + address.ship-address2 ,
        postal_code: address.ship-postcode ,
        city: address.ship-city ,
        state: 'CA',
        country: address.ship-country,
      },
    },
    amount: totalCart,
    currency: "usd",
    payment_method_types: ['card'],
    receipt_email: address.email
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
  
  console.log("customer: ", customer );

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
