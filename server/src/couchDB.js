import couchDb from 'nano';
import config from 'config';
 

export const couchDB =  new couchDb(config.get("couchDB.baseUrl"));
export const dbName = config.get("couchDB.dbName");

export function getAllDocuments () {
    const hubot = couchDB.db.use(dbName);

    return new Promise((resolve) => {
        hubot.list({include_docs: true}, (err, body) => {
            if(!err) {
                console.log(body.rows.map(row => row.doc));
                resolve(body.rows.map(row => row.doc));
            }
        });
    }); 
}
export function insertDocument (doc) {
    const hubot = couchDB.db.use(dbName);
    return new Promise((resolve) => {
        hubot.insert(doc,{include_docs: true}, (err, body) => {
            if(!err) {
                hubot.get(body.id, { revs_info: true }, (errIn, bodyIn) => {
                    if (!err)
                        resolve(bodyIn);
                });             
            }
        });
    });     
}