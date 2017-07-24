import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  graphql
} from 'react-apollo';
import cssModules from 'react-css-modules';
import '../styles/comment.scss'; 
import styles from '../styles/about-page.css';
import COMMENTS_QUERY from '../graphql/queries/Comments.graphql';
import { Grid } from 'react-virtualized';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


class HomePage extends Component {
  constructor(props, context) {
      super(props, context);
      this.state={
       title:this.props.title
      }
    }

  render() {
    const {
      loading,
      comments,
      networkStatus,
      variables,
      refetch
    } = this.props;
   
    function renderComment(comment) {
      return (
        <Card className="comment"	>
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
                    <FlatButton label="save" />
                 </CardActions>
                </CardText>
              </Card>
      )
    }

  return (
      <div>

           <TextField
              id="searchBox"
              onChange= {(e) => {
              let variables={ title:e.target.value};
              if( e.target.value &&  e.target.value.length >2) {
                refetch(variables);
              }
              this.setState(variables)
            }}
            value={this.state.title}/>

          
            <h3>Search Results for {variables.title}</h3>
         
           <br></br> 
        {
          loading ? <div>Loading</div>
          :<div>
              <h4>No Of Records {comments.count}</h4>
              {comments.list.map((comment) => renderComment(comment))}
            </div>
        }
      </div>
    );
  }
}
const CommentsWithData = graphql(COMMENTS_QUERY, {
   options: (ownProps) =>   
       ({
        variables: {
          title: ownProps.title
        }
      })    
  ,
  props: ({ownProps, data: { loading, error, comments, variables, networkStatus, refetch } }) => 
    ({
    comments,
    loading,
    error,
    variables,
    networkStatus,
    refetch
  }),
})(HomePage);
connect(
  (state) => ({ title: state.title }) 
)(HomePage);


export const HomePageContainer = (props) => {
  return (
    <CommentsWithData title=''
    />
  );
};
HomePageContainer.constuctor = () =>
  this.state = {
    title:''
  }

function mapStateToProps(state) {
  return {
    title: state.title 
  };
}

export default connect(
  mapStateToProps
)(HomePageContainer);
