import * as types from "../constants/ActionTypes";

export default function cards(state=[], action) {
  switch (action.type) {
    case types.FETCH_BOARD_SUCCESS: {
      const lists = action.board.lists;
      return state.concat(lists.reduce((all, {cards}) => all.concat(cards), []));
    }
    default:
      return state;
  }
}
