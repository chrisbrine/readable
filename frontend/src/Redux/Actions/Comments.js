import * as API from '../../API';
import * as Type from './Types';

export const getCommentsByPost = (parentId) => {
	return (dispatch) => {
		API.getComments(parentId).then(comments => {
			dispatch({
				type: Type.GET_COMMENTS,
				parentId,
				comments,
			});
		});
	};
};

export const newComment = (comment, parentId, callback) => {
	return (dispatch) => {
		API.newComment(comment).then(comment => {
			dispatch({
				type: Type.NEW_COMMENT,
				parentId,
				comment,
			});
		}).then(() => callback());
	}
};;

export const deleteComment = (commentId, callback) => {
	return (dispatch) => {
		API.deleteComment(commentId).then(() => callback())
		dispatch({
			type: Type.DELETE_COMMENT,
			commentId,
		});
	};
};

export const voteComment = (commentId, parentId, option) => {
	return (dispatch) => {
		API.voteComment(commentId, option).then(updatedComment => {
			dispatch({
				type: Type.VOTE_COMMENT,
				updatedComment,
				commentId,
				parentId,
			});
		});
	};
};

export const editComment = (commentId, parentId, timestamp, body, callback) => {
	return (dispatch) => {
		API.editComment(commentId, timestamp, body)
		.then(editedComment => {
			dispatch({
				type: Type.EDIT_COMMENT,
				editedComment,
				commentId,
				parentId,
			});
		}).then(() => callback());
	};
};
