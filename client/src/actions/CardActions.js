import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";
function createCardSuccess(newCard) {
  return {
    type: types.CREATE_CARD_SUCCESS,
    newCard
  }
}

export function fetchCardSuccess(card) {
  return { type: types.FETCH_CARD_SUCCESS, card };
}

export function updateCardSuccess(updatedCard) {
  return {type: types.UPDATE_CARD_SUCCESS, updatedCard};
}
export function fetchCard(id) {
  return function(dispatch) {
    apiClient.getCard(id, data => {
      dispatch(fetchCardSuccess(data.card));
    })
  }
}

export const updateCard = (card, callback) => {
  return function(dispatch) {
    apiClient.updateCard(card, updatedCard => {
      dispatch(updateCardSuccess(updatedCard));
      if (callback) {
        callback()
      }
    })
  }
}

export const createCard = (newCard, callback) => {
  return dispatch => {
    apiClient.createCard(newCard, (data) => {
      dispatch(createCardSuccess(data.card));
    })

    if (callback) {
      callback()
    }
  }
};