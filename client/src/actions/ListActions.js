import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

function createListSuccess(list) {
  return {
    type: types.CREATE_LIST_SUCCESS,
    list,
  }
}

function updateListTitleSuccess(list) {
  return {
    type: types.UPDATE_LIST_TITLE_SUCCESS,
    list,
  }
}

export function createList(list, callback) {
  return function (dispatch) {
    apiClient.createList(list, (newList) => {
      dispatch(createListSuccess(newList));
    })

    if (callback) {
      callback();
    }
  }
}

export function updateListTitle(title, id, callback) {
  return function (dispatch) {
    apiClient.updateListTitle(title, id, (newList) => {
      dispatch(updateListTitleSuccess(newList));
    })

    if (callback) {
      callback();
    }
  }
}
