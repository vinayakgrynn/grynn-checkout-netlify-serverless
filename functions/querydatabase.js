/* code from functions/todos-create.js */
const faunadb = require('faunadb')
const q = faunadb.query

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
  maxNetworkRetries: 2,
});


exports.handler = async (event, context, callback) => { 
  
  
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET
  })
  
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body);
  
  console.log("data: ", data);
  
  console.log("type: ", typeof(data) );

  var queryData = data["query"];
  
  console.log( "type: ", typeof(queryData), queryData );
  
  
  var netlify_access_token = data["netlify_access_token"];
  
  console.log( "netlify_access_token: ", typeof(netlify_access_token), netlify_access_token );
  
  console.log( " original context ", context );
  
  
  return client.query(
    q.Get(
      q.Match(q.Index('posts_by_title'), queryData )
    )
  )
  .then((response) => {
    
      console.log('success', response);
      
      return {
        headers: {"Access-Control-Allow-Origin":"*"},
        statusCode: 200,
        body: JSON.stringify(response)
      }
      
  }).catch((error) => {
      console.log('error', error)
      return {
        headers: {"Access-Control-Allow-Origin":"*"},
        statusCode: 400,
        body: JSON.stringify(error)
      }
  });

};
