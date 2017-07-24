import React, { Component, PropTypes} from 'react';
import CommentForm from '../components/CommentForm';
import { connect } from 'react-redux';
import * as actions from '../actions/commentActions';
import {bindActionCreators} from 'redux';

class CommentFormPage extends Component {
  componentDidMount() {
    const { id } = this.props.params;
    if(id){
      this.props.actions.fetchComments(this.props.params);
    } else {
      this.props.actions.newComment();
    }
    }
  render() {
    return (
      <div>
        <CommentForm comment={this.props.list.comments[0]} 
          formChange={this.props.actions.formChange}
          saveComment={this.props.actions.saveComment}/>
      </div>
    );
  }
}
CommentFormPage.propTypes = {
  actions: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
      list : state.commentsStore
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
)(CommentFormPage);