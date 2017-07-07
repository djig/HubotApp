import { 
        getComments,
        upsertComment,
        deleteDocument
    } from './couchbaseDB';

export function listComments (req, res) {
    console.log(req.params);
    getComments(req.params)
        .then((comments) => {
            res.json(comments);
        })
        .catch((error) => res.send(error));
}

export function updateInsertComment (req, res) {
    upsertComment(req.body)
        .then((comments) => {
            res.json(comments);
        })
        .catch((error) => res.send(error));
}

export function deleteComment (req, res) {
    deleteDocument(req.params)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => res.send(error));
}