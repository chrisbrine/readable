import sortBy from 'sort-by';
import * as Type from '../Actions/Types';

export default function posts ( state = [], action ) {
	const { posts, post, postId, updatedPost, sortKey } = action;
	switch(action.type) {
		case Type.GET_POSTS:
			return action.posts.filter(post => !(post.deleted));
		case Type.GET_POSTS_BY_CATEGORY:
			return posts.filter(post => !(post.deleted));
		case Type.NEW_POST:
			return state.concat([post]);
		case Type.EDIT_POST:
			return state.map(post => {
				if(post.id === postId) {
					post = updatedPost;
				}
				return post;
			})
		case Type.DELETE_POST:
			return state.filter(post => post.id !== postId);
		case Type.VOTE_POST:
			return state.map(post => {
				if (post.id === action.postId) {
					if (action.option === "upVote") {
						post.voteScore += 1;
					}
					if (action.option === "downVote") {
						post.voteScore -= 1;
					}
				}
				return post;
			})
		case Type.SORT_POST:
			return [].concat(state.sort(sortBy("-"+sortKey)));
		default:
			return state;
	}
}
