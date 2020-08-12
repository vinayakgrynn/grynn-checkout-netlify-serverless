
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
  maxNetworkRetries: 2,
});



exports.handler = async (event, context, callback) => { //= async (event) =>

  
const datav = JSON.parse(event.body);

const data = JSON.parse(datav);
  
console.log(data);
  
const address = data[0];
const cart = data[1];
const customerID = data[2];
const len = cart.length;

console.log("\nJSON:\n", typeof(address), address["firstname"] , address.firstname);
console.log("\naddress\n",typeof(address), address);
console.log("\ncart\n", typeof(cart), cart);


var totalCount = 0.0;
var totalCart = 0.0;

  
var user_id = customerID["user_id"];

var uuser = context.clientContext.user.sub;

  
if( uuser.localeCompare(user_id) === 0 )
{
  
    console.log( " uuser === user_id ",  uuser, user_id );

    const cust = await stripe.customers.update(

      customerID.customerID ,

      {

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
