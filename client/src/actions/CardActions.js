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

export function fetchCard(id) {
  return function(dispatch) {
    apiClient.getCard(id, data => {
      console.log(data)
      dispatch(fetchCardSuccess(data.card));
    })
  }
}

export const createCard = (newCard, callback) => {
  return dispatch => {
    apiClient.createCard(newCard, (createdCard) => {
      console.log(" back from server", createdCard)
      dispatch(createCardSuccess(createdCard.card));
    })

    if (callback) {
      callback()
    }
  }
};


// export function createBoard(board, callback) {
//   return function(dispatch) {
//     dispatch(createBoardRequest());
//     apiClient.createBoard(board, data => {
//       dispatch(createBoardSuccess(data.board));

//       if (callback) {
//         callback(data.board);
//       }
//     });
//   };
// }
