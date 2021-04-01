import * as types from "../constants/ActionTypes";
import apiClient from "../lib/ApiClient";

export const createCommentSuccess = (newComment) => {
  return {
    type: types.CREATE_COMMENT_SUCCESS,
    newComment,
  }
}

export const createComment = (comment, callback ) => {
  return  dispatch => {
    apiClient.createComment(comment, (data) => {
      dispatch(createCommentSuccess(data.comment));

      if (callback) {
        callback()
      }
    });
  }
}