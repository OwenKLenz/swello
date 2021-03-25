import * as types from "../constants/ActionTypes";

export default function lists(state=[], action) {
  switch (action.type) {
    case types.FETCH_BOARD_SUCCESS: {
      const cardlessLists = action.board.lists.map(list => {
        const {cards, ...listWithoutCards} = list;
        return listWithoutCards;
      });

      return state.concat(cardlessLists);
    }
    default:
      return state;
  }
}
