import * as types from "../constants/ActionTypes";
import apiClient from "../lib/ApiClient";

export const createActiontSuccess = (newAction) => {
  return {
    type: types.CREATE_ACTION_SUCCESS,
    newAction,
  }
}

export const createAction = (comment, callback ) => {
  return  dispatch => {
    apiClient.createAction(action, (data) => {
      dispatch(createActionSuccess(data.action));
      if (callback) {
        callback()
      }
    });
  }
}