const API_ROOT = 'http://127.0.0.1:5984/hubot/'
const GRAPH_QL = 'http://localhost:4000/graphql'


export const getDoc = (endpoint) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json)
        }
        return Object.assign({},
         json
        )
      })
    )
}
export const putDoc = (endpoint, data) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  return fetch(fullUrl,
  {
    method: 'PUT',
    body: data
  }).then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json)
        }
        return Object.assign({},
         json
        )
      })
    )


}
