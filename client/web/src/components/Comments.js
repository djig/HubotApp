import React, { Component, PropTypes } from 'react';
import '../styles/comment.scss';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

class Comments extends Component {
  render() {
    const {
          comments
        } = this.props;
    let key=0;
   
    function renderComment(comment) {
      ++key;
      return (
        <Card key={key} className="comment"	>
                <CardHeader
                  title={comment.title}
                  subtitle = {comment.text}
                  actAsExpander={true}
                  showExpandableButton={true}
                />

                <CardText expandable={true}>
                  <div>
                    Categogies: {comment.categories.join(", ")}
                  </div>
                   <div>
                    Ratings: {comment.ratings.join(", ")}
                  </div>
                  <CardActions>
                    
                     <Link  activeStyle={{color: 'blue'}} to={`/comments/${comment._id}`}>
                        <FlatButton label="edit" />
                      </Link>
                 </CardActions>
                </CardText>
              </Card>
      );
    }
    return (
      <div>
        {comments.map((comment) => renderComment(comment))}
      </div>
    );
  }
}
Comments.propTypes = {
  comments: PropTypes.object.isRequired
};
export default Comments;

