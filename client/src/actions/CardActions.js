import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";
function createCardSuccess(newCard) {
  return {
    type: types.CREATE_CARD_SUCCESS,
    newCard
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
