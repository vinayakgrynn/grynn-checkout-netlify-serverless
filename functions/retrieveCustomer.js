
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
  maxNetworkRetries: 2,
});


exports.handler = async (event, context, callback) => { 

  const data = JSON.parse(event.body);

  console.log(data);
  
  console.log("typeof: ", typeof(data));
 
  const customerID = data.key_value;
  
  var netlify_access_token = data["netlify_access_token"];
  
  var queryData = data;
  
  var uuser = context.clientContext.user.sub;
  
  if( uuser.localeCompare(queryData.title) === 0 )
  {
    
      console.log( " uuser === queryData.title ",  uuser, queryData.title );
    
      const cust = await stripe.customers.retrieve(
        customerID , 
      );
  
      console.log("customer: ", cust ); 
  
      return {
        statusCode: 200,
        headers: {"Access-Control-Allow-Origin":"*"},
        body: JSON.stringify( { Customer: cust } )
      }
    
  }
  else
  {    
      console.log( " uuser !== queryData.title ",  uuser, queryData.title );
      
      return {
          headers: {"Access-Control-Allow-Origin":"*"},
          statusCode: 401,
          body: JSON.stringify("Unauthorized: Bad Token")
      }

  }
    
    
  
};
