import * as API from '../../API';
import * as Type from './Types';

export const getPosts = () => {
	return (dispatch) => {
		API.getPosts()
			.then( posts => {
				dispatch({
					type: Type.GET_POSTS,
					posts
				});
			});
	};
};

export const getPostsByCategory = (category) => {
	return (dispatch) => {
		API.getPostsByCategory(category).then(posts => {
			dispatch({
				type: Type.GET_POSTS_BY_CATEGORY,
				posts,
			});
		});
	};
};

export const newPost = (post, callback) => {
	return (dispatch) => {
		API.newPost(post)
			.then(() => callback());
		dispatch({
			type: Type.NEW_POST,
			post,
		});
	};
};

export const editPost = (postId, title, body, callback) => {
	return (dispatch) => {
		API.editPost(postId, title, body)
			.then(editedPost => {
				dispatch({
					type: Type.EDIT_POST,
					editedPost,
					postId,
				});
			})
			.then(() => callback());
	};
};

export const deletePost = (postId, callback) => {
	return dispatch => {
		API.deletePost(postId)
			.then(() => callback());
		dispatch({
			type: Type.DELETE_POST,
			postId,
		});
	};
};

export const votePost = (postId, option) => {
	return (dispatch) => {
		API.votePost(postId, option).then(post => {
			dispatch({
				type: Type.VOTE_POST,
				postId,
				option,
			});
		});
	};
};

export const sortPost = (sortKey) => {
	return dispatch => {
		dispatch({
			type: Type.SORT_POST,
			sortKey,
		});
	};
};