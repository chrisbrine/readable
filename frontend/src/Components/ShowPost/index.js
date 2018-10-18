import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Actions from '../../Redux/Actions/Comments';
import * as PostActions from '../../Redux/Actions/Posts';

import { formatTimestamp } from '../../Utils/Helpers';

import VoteUp from '../../Images/VoteUp.png';
import VoteDown from '../../Images/VoteDown.png';

import './styles.css';

class ShowPost extends Component {
	componentDidMount() {
		this.props.getCommentsByPost(this.props.post.id);
	}
  	render() {
		const { post, comments, votePost, getPosts } = this.props;

		return (
			<div className='ShowPost'>
				{post && (
					<div className='post'>
						<div className='post-description'>
							<Link to={`/${post.category}/${post.id}`}>
								<div className='post-title'>
									<h3>{post.title}</h3>
								</div>
							</Link>

							<div className='post-body'>
								<p>{post.body}</p>
							</div>

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
						<div className='post-metadata'>
							<div className='post-author'><p><b>Category: </b> {post.category}</p></div>
							<div className='post-author'><p><b>Author: </b> {post.author}</p></div>
							<div className='post-author'><p><b>Time: </b> {formatTimestamp(post.timestamp)}</p></div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

function mapStateToProps({ comments }, { post }) {
	return {
		comments: comments[post.id],
	};
}

export default connect(mapStateToProps, { ...Actions, ...PostActions })(ShowPost);
