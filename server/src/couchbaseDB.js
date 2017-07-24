import couchbase from 'couchbase';
import config from 'config';
import { logSuccess, logError } from './chalkConfig';
import util from './util';

const hubotCluster = new couchbase.Cluster('couchbase://localhost'),
    N1qlQuery = couchbase.N1qlQuery,
    bucketName = config.get("couchbase.bucketName"),
    bucket = hubotCluster.openBucket(bucketName);

function getData(query) {
    let retObj,
        retArr =[],
        totalCnt;

    return new Promise((resolve, reject) =>{
        bucket.query(query,(err,result) =>{
            if(err) {
                console.log(logError(err));
                reject(err);
            }
            result.forEach(row => {
                if(row.count >= 0) {
                    totalCnt = row.count;
                } else {
                    retObj = row.Comments;
                    retObj._id =  row._id;
                    retArr.push(retObj);
                }
            });
            resolve({count: totalCnt, comments: retArr});  
        });
    });
}
export function getComments (args) {
    let nsql,
        whereClause ="",
        offset = args.offset?args.offset:0;

    bucket.enableN1ql(['localhost:8093']);

    if(args._id || args.title) {
        whereClause += ` WHERE `;
    }
    if(args._id) {
        whereClause += ` META().id='${args._id}' `;
    }
    if(args.title) {
        whereClause += args._id? " and":" ";
        whereClause += ` (text like '%${args.title}%' or title like '%${args.title}%' )`;
    }
    nsql = `select count(*) count from ${bucketName}`;
    nsql += whereClause;
    nsql += " UNION ALL(";
    nsql += `SELECT  META().id as _id, * FROM ${bucketName}  AS Comments `;
    nsql += whereClause;
    if(args.limit) {
        nsql += ` Limit ${args.limit} Offset ${offset}`;
    }
    nsql += ")";
    console.log(logSuccess(nsql));
    return getData(N1qlQuery.fromString(nsql));   
}
export function deleteDocument (args) {
    let docId = args._id,
        nsql;

    nsql = `delete from default where META().id ='${docId}'`;
    bucket.enableN1ql(['localhost:8093']);
    return new Promise((resolve, reject) => {
        bucket.query(N1qlQuery.fromString(nsql), (err, result) => {
            if(err) {
                reject(err);
            }
            resolve(`successfully deleted document: ${docId}${result}`);
        });
    });
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
        if(!comment.title) {
            reject("comments can not be empty"); 
        }
        bucket.upsert(docId.toString(), comment, (err, res) =>{
            if(err) {
                console.log(logError(err));
                reject(err);
            }
            console.log(logSuccess(`Successfully inserted document: ${res.cas}`));
            console.log(logSuccess(`Successfully inserted document: ${comment.title}`));
            resolve(Object.assign({}, comment, { '_id': docId }));
        });
    });
}  