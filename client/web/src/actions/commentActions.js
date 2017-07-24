import fetch from 'isomorphic-fetch';
import * as types from '../constants/actionTypes';

function requestComments(param) {
  return {
    type: types.REQUEST_COMMENTS,
    param
  };
}

export function receiveComments(param, json){
  return dispatch => {
    return dispatch({
            type: types.RECEIVE_COMMENTS,
            param,
            data: json,
            receivedAt: Date.now()
        });
  };
}

export function newComment() {
  return dispatch => {
    return dispatch({
            type: types.NEW_COMMENT
        });
  };
}

export function formChange(field, filedValue) {
  return dispatch => {
    return dispatch({
            type: types.FORM_CHANGE,
            data : {
              key: field,
              value: filedValue
            }
        });
  };
}

export function fetchComments(param) {
  let endPoint = `http://localhost:4002/comments`;
  if(param && param.id) {
    endPoint += `/${param.id}`;
  }
  if(param && param.title) {
    endPoint += `/search/${param.title}`;
  }

  return dispatch => {
    dispatch(requestComments(param));
    return fetch(endPoint)
      .then(response => response.json())
      .then(json => dispatch(receiveComments(param, json)));
  };
}

export function saveComment(comment) {
  let endPoint = `http://localhost:4002/comments`,
      methodType = comment._id ? 'PUT':'POST';

  endPoint += comment._id ? "/" + comment._id : '';

  return dispatch => {
    return fetch(endPoint, { 
              method: methodType,
              body: JSON.stringify(comment),
              headers: new Headers({'content-type': 'application/json'})
    })
    .then(response => response.json())
    .then(json => dispatch(
      {
            type: types.SAVE_COMMENT,
            comment: json
        }
    ));
  };
}