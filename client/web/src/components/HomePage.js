import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  graphql
} from 'react-apollo';
import cssModules from 'react-css-modules';
import styles from '../styles/about-page.css';
import COMMENTS_QUERY from '../graphql/queries/Comments.graphql';
import { Grid } from 'react-virtualized';

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
   let list = [];
   
   if(comments) {
     list = comments.map(comment => (
        Object.keys(comment).map( (key) => 
              Array.isArray(comment[key])? comment[key].join(",") 
                : key ==="_id" || key ==="_rev"? "": comment[key] 
                    )
              )
         ) 
   }
   function cellRenderer ({ columnIndex, key, rowIndex, style }) {
      return (
        <div
          key={key}
          style={style}>
          {list[rowIndex][columnIndex]}
        </div>
      )  
    }
  return (
      <div>
           <input 
            type='text' 
            ref='searchBox' 
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
              <h4>No Of Records {list.length}</h4>
              <Grid
                cellRenderer={cellRenderer}
                columnCount={list[0] ? list[0].length: 0}
                columnWidth={200}
                height={500}
                rowCount={list.length}
                rowHeight={60}
                width={1500}
              />
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
