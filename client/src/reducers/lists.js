import * as types from "../constants/ActionTypes";

export default function lists(state=[], action) {
  switch (action.type) {
    case types.FETCH_BOARD_SUCCESS: {
      const cardlessLists = action.board.lists.map(list => {
        // eslint-disable-next-line no-unused-vars
        const {cards, ...listWithoutCards} = list;
        return listWithoutCards;
      });
      return cardlessLists;
    }

    case types.CREATE_LIST_SUCCESS: {
      return state.concat(action.list);
    }
    case types.UPDATE_LIST_TITLE_SUCCESS: {
      // eslint-disable-next-line no-unused-vars
      const {cards, ...listWithoutCards} = action.list;

      return state.map(list => {
        return list._id === listWithoutCards._id ? listWithoutCards : list;
      })
    }
    default:
      return state;
  }
}
