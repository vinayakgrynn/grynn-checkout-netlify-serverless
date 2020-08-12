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
  
  console.log("context: ", context, );
  
  const {identity, user} = context.clientContext;
  
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body);
  
  console.log("data: ", data);
  
  console.log("type: ", typeof(data) );
  
  var queryData = data["query"];
  
  console.log( "type: ", typeof(queryData), queryData );
  
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