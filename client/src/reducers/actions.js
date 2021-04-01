import * as types from "../constants/ActionTypes";

export default function actions(state=[], action) {
  switch (action.type) {
    case types.FETCH_BOARD_SUCCESS: {
      const lists = action.board.lists;
      const cards = lists.reduce((all, {cards}) => all.concat(cards), []);
     return cards.reduce((all, {actions}) => all.concat(actions), []);
    }

    case types.UPDATE_CARD_SUCCESS: {
      return state.concat(action.updatedCard.action)
    }
    default:
      return state;
  }
}