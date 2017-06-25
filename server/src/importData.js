import { insertDocument, dbName } from "./couchDB";
import couchDb from "nano";
import config from "config";
import commentsData from "../data/initialComments.json";
const couchDB =  new couchDb(config.get("couchDB.baseUrl"));

const insertComments = () => 
    commentsData.data.comments.forEach((comment) => {
        insertDocument(comment);
    });

couchDB.db.get(dbName, (err, body) => {
    if (err) {
        couchDB.db.create(dbName, () =>{
            insertComments();
        });
    } else {
        console.log(body);
        insertComments();
    } 
});
