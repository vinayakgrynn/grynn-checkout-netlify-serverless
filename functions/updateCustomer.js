
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



const cust = await stripe.customers.update(
  address.customerID ,
  {
  name: address.firstname + " " + address.lastname ,
  phone: address.tel,
  email: address.email,
  address: {
    line1: address.billaddress + "  " + address.billaddress2 ,
    postal_code: address.billpostcode ,
    city: address.billcity ,
    state: '',
    country: address.billcountry,
  },
  shipping: {
      name: address.firstname + " " + address.lastname ,
      phone: address.tel,
      address: {
        line1: address.shipaddress + "  " + address.shipaddress2 ,
        postal_code: address.shippostcode ,
        city: address.shipcity ,
        state: '',
        country: address.shipcountry,
      },
  },
  
  });
  


console.log("customer: ", cust );
  
console.log("paymentIntent: ", paymentIntent );
  
return {
    statusCode: 200,
    headers: {"Access-Control-Allow-Origin":"*"},
    body: JSON.stringify({
      customerID: cust.id , 
      Customer: cust,
    }),
};
  
  
};
