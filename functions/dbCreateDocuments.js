/* code from functions/todos-create.js */
const faunadb = require('faunadb')
const q = faunadb.query


exports.handler = async (event, context, callback) => { 
  
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET
  }) 
  
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body);
  
  console.log("data: ", data);
  
  console.log("type: ", typeof(data) );
  
  var queryData = data;
  
  console.log( "queryData: ", typeof(queryData), queryData );
  
  
  var netlify_access_token = data["netlify_access_token"];
  
  //console.log( "netlify_access_token: ", typeof(netlify_access_token), netlify_access_token );
  //console.log( " original context ", context );
  
  var uuser = context.clientContext.user.sub;

  //console.log( " uuser ", uuser, typeof(uuser) );
  
  if( uuser.localeCompare(queryData.title) === 0 )
  {
  
    console.log( " uuser === queryData.title ",  uuser, queryData.title );
    
    return client.query(
      q.Create(
        q.Collection('grynntable'),
        { data: { title : queryData.title ,  key_value: queryData.key_value } },
      )
    )
    .then((response) => {
        console.log('success', response)
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
    
  }
  else
  {    
    
    return {
        headers: {"Access-Control-Allow-Origin":"*"},
        statusCode: 401,
        body: JSON.stringify("Unauthorized: Bad Token")
    }
    
  }
    
  
};
