import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { formatTimestamp } from '../../Utils/Helpers';

import * as commentActions from '../../Redux/Actions/Comments';

import VoteUp from '../../Images/VoteUp.png';
import VoteDown from '../../Images/VoteDown.png';

import './styles.css';

class ShowComment extends Component {
	onCommentDelete = (comment) => {
		let parentId = comment.parentId;
		this.props.deleteComment(comment.id, () => {
			this.props.history.push(`/post/${parentId}`);
			this.props.getCommentsByPost(comment.parentId);
		});
	}
  	render() {
		return (
			<div className='ShowComment'>
				{this.props.comments.map(comment => (
					<div className='comment' key={comment.id}>
						<div>
							<p>{comment.body}</p>
							<div className='comment-author'><p> by <b>{comment.author}</b> at {formatTimestamp(comment.timestamp)}</p></div>
							<div className='post-likes'>
								<img src={VoteUp} width='28' height='28' onClick={() => {
									this.props.voteComment(comment.id, comment.parentId, 'upVote')
								}} alt='Vote Up' />
								<img src={VoteDown} width='28' height='28' onClick={() => {
									this.props.voteComment(comment.id, comment.parentId, 'downVote')
								}} alt='Vote Down' />
								{comment.voteScore} votes
								</div>
						</div>
						<div className='button-action-comments'>
							<Link to={`/${this.props.category}/${comment.parentId}/${comment.id}/edit`}>
								<button className='button-edit'>Edit</button>
							</Link>
							<button className='button-delete' onClick={() => this.onCommentDelete(comment)}>Delete</button>
						</div>
					</div>
				))}
			</div>
		);
	}
}

function mapStateToProps({ posts }) {
  return { posts }
}

export default connect(mapStateToProps, commentActions)(ShowComment)
