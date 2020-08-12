
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
  maxNetworkRetries: 2,
});


exports.handler = async (event, context, callback) => { //= async (event) =>

const data = JSON.parse(event.body);

//console.log(data);
  
const address = data[0];

console.log(address);

var queryData = data[1];
  
//var netlify_access_token = queryData["netlify_access_token"];

var user_id = queryData["user_id"];

var uuser = context.clientContext.user.sub;
  
  
if( uuser.localeCompare(user_id) === 0 )
{

    console.log( " uuser === user_id ",  uuser, user_id );
  
    const cust = await stripe.customers.create({
      name: address.firstname + " " + address.lastname ,
      phone: address.tel,
      email: address.email,
      address: {
        line1: address.billaddress ,
        line2: address.billaddress2 ,
        postal_code: address.billpostcode ,
        city: address.billcity ,
        state: '',
        country: address.billcountry,
      },
      shipping: {
          name: address.firstname + " " + address.lastname ,
          phone: address.tel,
          address: {
            line1: address.shipaddress ,
            line2: address.shipaddress2 ,
            postal_code: address.shippostcode ,
            city: address.shipcity ,
            state: '',
            country: address.shipcountry,
          },
      },

    });


    console.log("customer: ", cust );


    return {
        statusCode: 200,
        headers: {"Access-Control-Allow-Origin":"*"},
        body: JSON.stringify({
          customerID: cust.id , 
          Customer: cust,
        }),
    };
  
  
}
else
{    
    
    console.log( " uuser !== user_id ",  uuser, user_id );
    
    return {
        headers: {"Access-Control-Allow-Origin":"*"},
        statusCode: 401,
        body: JSON.stringify("Unauthorized: Bad Token")
    }
    
}
  
  
};
