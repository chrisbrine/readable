import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPosts, editPost } from '../../Redux/Actions/Posts';
import { getCommentsByPost } from '../../Redux/Actions/Comments';

import './styles.css';

class EditPost extends Component {
	componentDidMount() {
		this.props.getPosts();
		this.props.getCommentsByPost(this.props.match.params.postId);
	}
	render() {
		const { post } = this.props;

		return (
			<div className="EditPost">
				<form onSubmit={this.editPost}>
					<h2>Edit Post</h2>
					<ul className="form-style-1">
						<li>
							<label>Author</label>
							<span>{post.author}</span>
						</li>
						<li>
							<label>Title <span className="required">*</span></label>
							<input defaultValue={post.title} type="text" name="title" className="field-long" />
						</li>
						<li>
							<label>Post <span className="required">*</span></label>
							<textarea defaultValue={post.body} name="body" id="field5" className="field-long field-textarea"></textarea>
						</li>
						<button>Update</button>
						<Link to={`/post/${post.id}`}>
							<button>Cancel</button>
						</Link>
					</ul>
				</form>
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
		comments: comments[match.params.postId],
	}
}

export default connect(mapStateToProps, { getPosts, editPost, getCommentsByPost })(EditPost)
