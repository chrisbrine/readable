import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { formatTimestamp } from '../../Utils/Helpers';

import { getCommentsByPost } from '../../Redux/Actions/Comments';
import { getPosts, votePost, deletePost } from '../../Redux/Actions/Posts';

import VoteUp from '../../Images/VoteUp.png'
import VoteDown from '../../Images/VoteDown.png'

import App404 from '../App404';
import ShowComment from '../ShowComment';

import './styles.css';

class ShowPostDetail extends Component {
	componentDidMount() {
		this.props.getPosts();
		this.props.getCommentsByPost(this.props.match.params.postId);
  	}
  	onPostDelete = () => {
		const id = this.props.match.params.postId;
		this.props.deletePost(id, () => {
			this.props.history.push('/');
		});
	}
	render() {
		const { post, comments, votePost, getPosts } = this.props
		if(!post) {
			return <App404 />;
		}
		return (
			<div className='ShowPostDetail'>
				{post && (
					<div className='post' key={post.id}>
						<div className='post-description'>
							<Link to={`/${post.category}/${post.id}`}>
								<div className='post-title'><h3>{post.title}</h3></div>
							</Link>
							<div className='post-body'><p>{post.body}</p></div>
							<div className='post-likes'>
								<img src={VoteUp} width='28' height='28' onClick={() => {
									votePost(post.id, 'upVote')
									getPosts()
								}} alt='Vote Up' />
								<img src={VoteDown} width='28' height='28' onClick={() => {
									votePost(post.id, 'downVote')
									getPosts()
								}} alt='Vote Down' />
							</div>
							<div className='post-likes-comments'>
								{post.voteScore} votes {comments && comments ? comments.length : 0} comments
					 </div>
						</div>
						<div>
							<div className='post-author'><p><b>Category: </b> {post.category}</p></div>
							<div className='post-author'><p><b>Author: </b> {post.author}</p></div>
							<div className='post-author'><p><b>Time: </b> {formatTimestamp(post.timestamp)}</p></div>
						</div>
					</div>
				)}

				<div className='button-action-posts'>
							<Link to={`/${post.category}/${post.id}/edit`}>
								<button className='button-edit'>Edit</button>
							</Link>
							<Link to={`/${post.category}/${post.id}/comment`}>
								<button className='button-add'>Add Comment</button>
							</Link>
							<button className='button-delete' onClick={(e) => this.onPostDelete(e)}>Delete</button>
						</div>

				{post && comments && <ShowComment category={post.category} comments={comments} history={this.props.history}/>}
			</div>
		);
	}
}

function mapStateToProps({ posts, comments }, { match }) {
	let post = false;
	let postKeys = Object.keys(posts);
	for (let index = 0; index < postKeys.length; index++) {
		if (posts[index].id === match.params.postId) {
			post = posts[index];
			break;
		}
	}
	return {
		post: post,
		comments: comments[match.params.postId]
	};
}

export default connect(mapStateToProps, {
	getPosts,
	votePost,
	deletePost,
	getCommentsByPost,
})(ShowPostDetail);
