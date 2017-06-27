import couchbase from 'couchbase';
import config from 'config';
import commentsData from "../data/initialComments.json";
import {logSuccess, logError} from './chalkConfig';
const hubotCluster = new couchbase.Cluster('couchbase://localhost'),
    N1qlQuery = couchbase.N1qlQuery;
let bucket,
    query,
    comment,
    id;

const insertData = (name) => {
    bucket = hubotCluster.openBucket(config.get("couchbase.bucketName"));
    bucket.operationTimeout = 200 * 1000;

    for(let i=0;i< commentsData.data.comments.length; i++){
        comment =  commentsData.data.comments[i];
        id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                                    let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                                    return v.toString(16);
                                });
        bucket.insert(id.toString(), comment, (err, res) =>{
            if(err) {
                    console.log(logError(err));
                    process.exit();
            }
            console.log(logSuccess("Successfully inserted document: "+ res.cas));
            if(i === commentsData.data.comments.length-1) {
                
                query = N1qlQuery.fromString("CREATE PRIMARY INDEX ON " + name + " USING View;");
                bucket.query(query,(err, res) => {
                    if(err) {
                        console.log(logError(err));
                        
                    }
                    console.log(logSuccess("Successfully created index: "+ res));
                    process.exit();
                });
            }
        });
    }
};

insertData(config.get("couchbase.bucketName"));