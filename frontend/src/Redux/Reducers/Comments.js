import * as Type from '../Actions/Types';

export default function comments ( state = {}, action ) {
	const { comments, commentId, parentId, updatedComment} = action;
	switch(action.type) {
		case Type.GET_COMMENTS:
			return Object.assign({}, state, {[parentId]: comments});
		case Type.VOTE_COMMENT:
			return {
				...state,
				[parentId]: state[parentId].map(comment => {
					if(comment.id === commentId) {
						comment = updatedComment;
					}
					return comment;
				}),
			}
		case Type.EDIT_COMMENT:
			return {
				...state,
				[parentId]: state[parentId].map(comment => {
					if(comment.id === commentId) {
						comment = updatedComment;
					}
					return comment;
				}),
			};
		case Type.NEW_COMMENT:
			return Object.assign({}, state, {[parentId]: comments});
		case Type.DELETE_COMMENT:
			return state;
		default:
			return state;
	}
}
