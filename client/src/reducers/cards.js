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
    default:
      return state;
  }
}
