import { 
        listComments, 
        updateInsertComment, 
        deleteComment 
    } from './routesResolvers';

export function routes (server) {
    server.route("/comments")
            .get(listComments)
            .post(updateInsertComment);

    server.route("/comments/:_id")
            .get(listComments)
            .put(updateInsertComment)
            .delete(deleteComment);
}