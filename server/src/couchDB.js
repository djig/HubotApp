import couchDb from 'nano';
import config from 'config';
 

export const couchDB =  new couchDb(config.get("couchDB.baseUrl"));
export const dbName = config.get("couchDB.dbName");

export function getAllDocuments () {
    const hubot = couchDB.db.use(dbName);
    let comments =[];
    return new Promise((resolve) => {
        hubot.list({include_docs: true}, (err, body) => {
            if(!err) {
                resolve(body.rows.map(row => row.doc));
            }
        })
    }); 
}