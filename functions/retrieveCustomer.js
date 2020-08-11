
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
  maxNetworkRetries: 2,
});


exports.handler = async (event, context, callback) => { 

  const data = JSON.parse(event.body);

  console.log(data);
  console.log("typeof: ", typeof(data));
 
  const customerID = data;

  const cust = await stripe.customers.retrieve(
    customerID , 
  );
  
  console.log("customer: ", cust ); 
  
  return {
    statusCode: 200,
    headers: {"Access-Control-Allow-Origin":"*"},
    body: JSON.stringify({
      Customer: cust,
    }),
  };
  
};
