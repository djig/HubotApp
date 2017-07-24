import * as types from '../constants/actionTypes';
import objectAssign from 'object-assign';

const defaultState = {
  count:1,
  comments: [
              {
                "text": "",
                "title": "",
                "ratings": [
                ],
                "categories": [
                  "Technology",
                ]
              }
          ]
};

export default function commentsReducer(state = defaultState, action) {
  let newState;

  switch (action.type) {
    case types.FORM_CHANGE:
      newState = objectAssign({}, state.comments[0]);
      newState[action.data.key] = action.data.value;
      return {
        count:state.count,
        comments:[newState]
      };
    case types.RECEIVE_COMMENTS:
      newState = objectAssign({},state);
      newState.count = action.data.count;
      newState.comments = action.data.comments;
      return newState;
    case types.SAVE_COMMENT:
      newState = objectAssign({}, state.comments[0]);
      newState = action.comment;
      return {
        count:state.count,
        comments:[newState]
      };
    case types.NEW_COMMENT:
      return  defaultState;
       
    default:
      return state;
  }
}