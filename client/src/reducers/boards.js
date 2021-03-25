import * as types from "../constants/ActionTypes";

export default function boards(state = [], action) {
  switch (action.type) {
    case types.FETCH_BOARDS_SUCCESS: {
      return action.boards;
    }
    case types.CREATE_BOARD_SUCCESS: {
      const newBoard = action.board;
      return state.concat(newBoard);
    }
    case types.FETCH_BOARD_SUCCESS: {
      const boards = state.filter(board => {
        board._id !== action.board._id;
      });
      // eslint-disable-next-line no-unused-vars
      const { lists, ...redactedBoard} = action.board;
      return boards.concat(redactedBoard);
    }
    default:
      return state;
  }
}
