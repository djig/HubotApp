
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  graphql
} from 'react-apollo';
import * as actions from '../actions/userActions';
import  gql from 'graphql-tag';
import cssModules from 'react-css-modules';
import styles from '../styles/about-page.css';
import USERS_QUERY from '../graphql/queries/Users.graphql';
import { Grid } from 'react-virtualized';

class UserPage extends Component {
  constructor(props, context) {
      super(props, context);
     this.state={
       name:this.props.name
      }
    }

  render() {
    const {
      loading,
      users,
      networkStatus,
      variables,
      refetch
    } = this.props;
   let list = [];
   
   if(users) {
     list = users.map(user => (
        Object.keys(user).map( (key) => 
              Array.isArray(user[key])? user[key].map(org => 
                    org.company_name).join(",") : user[key]
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
            let variables={ name:e.target.value};
            if( e.target.value &&  e.target.value.length >2) {
              refetch(variables);
            }
            this.setState(variables)
          }}
          value={this.state.name}/>
           <h3>Search Results for {variables.name}</h3>
           <br></br> 
        {
          loading ? <div>Loading</div>
          :<div>
              <h4>No Of Records {list.length}</h4>
              <Grid
                cellRenderer={cellRenderer}
                columnCount={list[0] ? list[0].length: 0}
                columnWidth={250}
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
const UsersWithData = graphql(USERS_QUERY, {
   options: (ownProps) =>   
       ({
        variables: {
          name: ownProps.name
        }
      })    
  ,
  props: ({ownProps, data: { loading, error, users, variables, networkStatus, refetch } }) => 
    ({
    users,
    loading,
    error,
    variables,
    networkStatus,
    refetch
  }),
})(UserPage);
connect(
  (state) => ({ name: state.name }) 
)(UserPage);


export const UserPageContainer = (props) => {
  return (
    <UsersWithData name='Abc'
    />
  );
};
 
UserPageContainer.constuctor = () =>
  this.state = {
    name:'sal'
  }

UserPageContainer.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    name: state.name 
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPageContainer);
