import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import ChipInput from 'material-ui-chip-input';
import FlatButton from 'material-ui/FlatButton';

class CommentForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.save = this.save.bind(this);
    this.formChange = this.formChange.bind(this);
  }
  formChange(field, value) {
    this.props.formChange(field, value);
  }

 save(comment) {
    this.props.saveComment(comment);
  }
  
  render() {
    const {comment} = this.props;
    return (
      <div>
        <p>{comment.title}</p>
        <div>
          <TextField
              hintText="Enter Title"
              floatingLabelText="Title"
              name="title"
              onChange = {(e) =>{
                this.formChange('title', e.target.value);
              }}
              value ={comment.title}
              floatingLabelFixed={true}
            />
        </div>
        <div>
          <TextField
              hintText="Description"
              floatingLabelText="Description"
              name="text"
              onChange = {(e) =>{
                this.formChange('text', e.target.value);
              }}
              value ={comment.text}
              floatingLabelFixed={true}
            />
        </div>
        <div>
          <ChipInput
              name="categories"
              floatingLabelText="Categories"
              defaultValue={comment.categories}
              onChange={(categories) => this.formChange('categories', categories)}
            />
        </div>
        <div>
          <ChipInput
              name="Ratings"
              floatingLabelText="Ratings"
              defaultValue={comment.ratings}
              onChange={(ratings) => this.formChange('ratings', ratings)}
            />
        </div>
        <div>
          <div >
            <FlatButton label="Save" primary={true} onClick={() => this.save(comment)}/>
          </div>
          
        </div>
      </div>
    );
  }
}
CommentForm.propTypes = {
  formChange: PropTypes.func.isRequired,
  saveComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired
};
export default CommentForm;