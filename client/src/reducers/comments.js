import * as types from "../constants/ActionTypes";

export default function comments(state=[], action) {
  switch (action.type) {
    case types.FETCH_BOARD_SUCCESS: {
      const lists = action.board.lists;
      const cards = lists.reduce((all, {cards}) => all.concat(cards), []);
     return cards.reduce((all, {comments}) => all.concat(comments), []);
    }
    case types.CREATE_COMMENT_SUCCESS: {
      return state.concat(action.newComment);
    }
    case types.FETCH_COMMENT_SUCCESS: {
      return state.filter(comment => comment._id !== action.comment._id)
        .concat(action.comment)
    }
    case types.UPDATE_COMMENT_SUCCESS: {
      return state.map(comment => {
        if (COMMENT._id === action.updatedComment._id) {
          comment = action.updatedComment
        }
        return comment
      })
    }
    case types.DELETE_COMMENT_SUCCESS: {
      return state.filter(comment => comment._id !== action.commentId)
    }
    default:
      return state;
  }
}