import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as commentActions from '../../Redux/Actions/Comments';

import './styles.css';

class EditComment extends Component {
	componentDidMount() {
		this.props.getCommentsByPost(this.props.match.params.postId)
	}
	editComment = (e) => {
		e.preventDefault()
		const commentId = this.props.comment.id
		const postId = this.props.comment.parentId
		const timestamp = Date.now()
		const body = e.target.body.value

		if (body === "") {
			alert('Comment cannot be empty')
		} else {
			this.props.editComment(commentId, postId, timestamp, body,
				() => this.props.history.push(`/post/${postId}`))
		}
	}
	render() {
		return (
			<div className="EditComment">
				<form onSubmit={this.editComment}>
					<h2>Edit Comment</h2>
					<ul className="form-style-1">
						<li>
							<label>Author</label>
							<span>{this.props.comment.author}</span>
						</li>
						<li>
							<label>Comment <span className="required">*</span></label>
							<textarea value={this.props.comment.body} name="body" id="field5" className="field-long field-textarea"></textarea>
						</li>
						<button>Update</button>
						<Link to={`/post/${this.props.comment.parentId}`}>
							<button>Cancel</button>
						</Link>
					</ul>
				</form>
			</div>
		);
	}
}

function mapStateToProps({ posts, comments }, { match }) {
	const { postId, commentId } = match.params;
	let comment = {};
	if (comments[postId] !== undefined) {
		let commentKeys = Object.keys(comments[postId]);
		for (let index = 0; index < commentKeys.length; index++) {
			if (comments[postId][index].id === commentId) {
				comment = comments[postId][index];
			}
		}
	}	
	return {
		comment: comment,
		comments,
		posts,
	}
}

export default connect(mapStateToProps, commentActions)(EditComment);
