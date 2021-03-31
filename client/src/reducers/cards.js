import * as types from "../constants/ActionTypes";

export default function cards(state=[], action) {
  switch (action.type) {
    case types.FETCH_BOARD_SUCCESS: {
      const lists = action.board.lists;
      return lists.reduce((all, {cards}) => all.concat(cards), []);
    }
    case types.CREATE_CARD_SUCCESS: {
      return state.concat(action.newCard);
    }
    case types.FETCH_CARD_SUCCESS: {
      return state.filter(card => card._id !== action.card._id)
        .concat(action.card)
    }
    case types.UPDATE_CARD_SUCCESS: {
      return state.map(card => {
        if (card._id === action.updatedCard._id) {
          card = action.updatedCard
        }
        return card
      })
    }
    default:
      return state;
  }
}
