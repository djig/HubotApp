import React, { Component, PropTypes } from "react";
import  Comments from "../components/Comments";
import { connect } from 'react-redux';
import * as actions from '../actions/commentActions';

import {bindActionCreators} from 'redux';
import TextField from 'material-ui/TextField';

class CommentPage extends Component {
    componentDidMount() {
        this.props.actions.fetchComments();
    }
    render () {
        return (
            <div>
                <TextField
                    onChange= {(e) => {
                            this.props.actions.fetchComments({title:e.target.value});
                            this.searchKeyWord = e.target.value;
                            }
                        }
                    value={this.searchKeyWord}/>

                <h4> List of Comments {this.props.list.count}</h4>
                <Comments comments={this.props.list.comments}/>
            </div>
        );
    }
}
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

CommentPage.propTypes = {
  actions: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentPage);