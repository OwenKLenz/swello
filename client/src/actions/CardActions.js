import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

function createCardSuccess(newCard) {
  return {
    type: types.CREATE_CARD_SUCCESS,
    newCard
  }
}

export function moveCardSuccess(updatedCard) {
  return {type: types.MOVE_CARD_SUCCESS, updatedCard}
}
export function fetchCardSuccess(card) {
  return { type: types.FETCH_CARD_SUCCESS, card };
}

export function updateCardSuccess(updatedCard, action) {
  return {type: types.UPDATE_CARD_SUCCESS, updatedCard, action};
}
export function deleteCardSuccess(CardId) {
  return {type: types.DELETE_CARD_SUCCESS, CardId};
}
export function fetchCard(id) {
  return function(dispatch) {
    apiClient.getCard(id, data => {
      dispatch(fetchCardSuccess(data.card));
    })
  }
}

export function moveCard(card, newList, position) {
  return function(dispatch) {
    const newCard = {...card, listId: newList._id, boardId: newList.boardId, position};
    dispatch(moveCardSuccess(newCard))
  }
}


export const deleteCard = (cardId, callback) => {
  return function(dispatch) {
    apiClient.deleteCard(cardId, updatedCard => {
      dispatch(deleteCardSuccess(updatedCard));
      if (callback) {
        callback()
      }
    })
  }
}

export const updateCard = (card, callback) => {
  console.log( "dispatched", card)
  return function(dispatch) {
    apiClient.updateCard(card, updatedCard => {
      const {card, action} = updatedCard
      dispatch(updateCardSuccess(card, action));
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
