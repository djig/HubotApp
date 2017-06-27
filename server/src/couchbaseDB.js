import couchbase from 'couchbase';
import config from 'config';
import { logSuccess, logError } from './chalkConfig';
import util from './util';

const hubotCluster = new couchbase.Cluster('couchbase://localhost'),
    N1qlQuery = couchbase.N1qlQuery,
    bucketName = config.get("couchbase.bucketName"),
    bucket = hubotCluster.openBucket(bucketName);
let query,
    nsql,
    retObj;

function getData(query) {
    return new Promise((resolve, reject) =>{
        bucket.query(query,(err,result) =>{
            if(err) {
                console.log(logError(err));
                reject(err);
            }
            console.log(logSuccess(nsql));
            resolve(result.map(row => {
                retObj = row.Comments;
                retObj._id = row._id;
                return retObj;
            }));  
        });
    });
}
export function getComments (args) {
    bucket.enableN1ql(['localhost:8093']);

    nsql = "SELECT  META().id as _id, * FROM " + bucketName + "  AS Comments ";
    if(args.id || args.title) {
        nsql += " WHERE ";
    }
    if(args.id) {
        nsql += " META().id='" + args.id + "'";
    }
    if(args.title) {
        nsql += args.id? " and":" ";
        nsql += " (text like '% " + args.title + " %' or title like '% " + args.title + " %')";
    }
    console.log(logSuccess(nsql));
    query = N1qlQuery.fromString(nsql);

    return getData(query);   
}

export function upsertComment (args) {
    let docId = args._id,
        comment = Object.assign({}, args);

    if(!docId) {
        docId = util.getnerateUUID();
    }
    if (comment._id) {
        delete comment._id;
    }
    return new Promise((resolve, reject) =>{
        bucket.upsert(docId.toString(), comment, (err, res) =>{
            if(err) {
                console.log(logError(err));
                reject(err);
            }
            console.log(logSuccess("Successfully inserted document: "+ res.cas));
            resolve(Object.assign({}, comment, { '_id': docId }));
        });
    });
}  