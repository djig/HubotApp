
import { typeDefs } from '../graphQl/schema'; 
import client from '../graphQl/client'

import {
  gql,
  graphql
} from 'react-apollo';


const userListQuery = gql`
   query UserQuery {
     users(name: "salmon"){
       id, 
       first_name, 
       last_name, 
       phone, 
       user_name
      }
   }
 `;


const startingRequest = () => {
  return {
    type: "STARTING_REQUEST"
  }
}
const finishedRequest = (response) => {
  return {
    type: "FINISHED_REQUEST",
    response: response
  }
}


export const getGraph = (payload) => {


   
 

const ChannelsList = ({ data: {loading, error, channels }}) => {
      if (loading) {
        return <p>Loading ...</p>;
      }
      console.log(error);
      if (error) {
        return <p>{error.message}</p>;
      }
      
      return <ul>
        { channels.map( ch => <li key={ch.id}>{ch.id + '-' + ch.name}</li> ) }
      </ul>;
    };
    const ChannelsListWithData = graphql(userListQuery)(ChannelsList);
    console.log(ChannelsListWithData());
    
    payload='{users(name: "salmon"){id, first_name, last_name, phone, user_name}}';
  return dispatch => {
    dispatch(startingRequest());
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open("POST", "http://localhost:4000/graphql");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onload = function () {
            console.log('data returned:', xhr.response);
            resolve(xhr.response);
        }
        xhr.send(JSON.stringify({query: payload}));
        
    }).then( (response) => {
        console.log(response);
        dispatch(finishedRequest(response))
    })
            
  }
}