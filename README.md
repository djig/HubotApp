# HubotApp
 
## Get Started

### Clone the project. git clone git@github.com:djig/HubotApp.git.

### For GraphQL/Express Server 
    $ cd server
    $ npm install
    Install CouchBase DB https://www.couchbase.com/downloads
    $ npm run importDataCouchbase
    $ npm start
    graphiQL will be running on port 4000 http://localhost:4000/graphiql
    Verify by running http://localhost:4000/graphiql?query=query%20Comments%7B%0A%20%20comments%7B%0A%20%20%20%20_id%0A%20%20%20%20text%0A%20%20%7D%0A%7D&operationName=Comments

### For React/Redux/Apollo GraphQl Client
    $ cd client/web
    $ npm install
    $ npm start

### Please make sure install watchman
https://facebook.github.io/watchman/

#### Installing on OS X via Homebrew
    $ brew update
    $ brew install watchman
    