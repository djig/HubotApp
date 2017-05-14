import React from 'react';
import { getGraph } from '../actions/userActions.js'
import { connect } from 'react-redux';

class UserGraphQuery extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    console.log("jgi");
    // this.props.dispatch(
    //   getGraph("{users(name: 'salmon'){ {id, first_name, last_name, phone, user_name}}")
    // );
  }
   render() {
      let dispatch = this.props.dispatch;
      // let fetchInProgress = String(this.props.store.get('fetching'));
      // let queryText;
      // let users = this.props.store.get('data').toObject();
      return (
        <div>
          <p>List users: </p>
          
          <button onClick={() => {
            dispatch(getGraph("{users(name: 'salmon'){ {id, first_name, last_name, phone, user_name}}"))}
          }>
            query
          </button>
        </div>
      )
  }
};

const mapStateToProps = (state) => {
  return {
    store: state
  }
};

export default UserGraphQuery = connect(
  mapStateToProps
)(UserGraphQuery);

 

