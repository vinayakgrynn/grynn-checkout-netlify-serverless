
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
  maxNetworkRetries: 2,
});


exports.handler = async (event, context, callback) => { 

const datav = JSON.parse(event.body);

console.log(datav);
  
//const data = JSON.parse(datav);
  
console.log(data);
  
//const address = data[0];
/*
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
*/
  
};
