import { getAllDocuments, insertDocument, couchDB, dbName } from "./couchDB"
import commentsData from "../data/initialComments.json"

couchDB.db.get(dbName, (err, body) => {
    if (err) {
        couchDB.db.create(dbName);
    }
    commentsData.data.comments.forEach((comment) => {
        insertDocument(comment);
    });
});