
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
  maxNetworkRetries: 2,
});


//const inventory = require('./data/products.json');


exports.handler = async (event, context, callback) => { //= async (event) =>

const datav = JSON.parse(event.body);

const data = JSON.parse(datav);
  
console.log(data);
  
const address = data[0];
const cart = data[1];
const len = cart.length;


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



const cust = await stripe.customers.retrieve(
  address.customerID , 
  function(err, customer) {
    // asynchronously called
  }
);
  


console.log("customer: ", cust ); 
  
return {
    statusCode: 200,
    headers: {"Access-Control-Allow-Origin":"*"},
    body: JSON.stringify({
      customerID: cust.id , 
      Customer: cust,
    }),
};
  
  
};
