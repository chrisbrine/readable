import React, { Component } from 'react';
import { connect } from 'react-redux';

import { newComment } from '../../Redux/Actions/Comments';
import { guid } from '../../Utils/Helpers';

import './styles.css';

class NewComment extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		const postId = this.props.match.params.postId;
		const commendBody = e.target.body.value;
		const author = e.target.author.value;

		if (commendBody === "" || author === "") {
			alert("Both fields are mandatory");
		} else {
			const submitComment = {
				id: guid(),
				parentId: postId,
				timestamp: Date.now(),
				body: commendBody,
				author: author,
			};
			this.props.newComment(submitComment, postId,
				() => this.props.history.push(`/post/${postId}`));
		}
	}
	render() {
		return (
			<div className="NewComment">
				<form onSubmit={this.handleSubmit}>
					<ul className="form-style-1">
						<li>
							<label>Name <span className="required">*</span></label>
							<input type="text" name="author" className="field-long" />
						</li>
						<li>
							<label>Comment <span className="required">*</span></label>
							<textarea name="body" id="field5" className="field-long field-textarea"></textarea>
						</li>
						<button>Submit</button>
					</ul>
				</form>
			</div>
		);
	}
}

function mapStateToProps({ posts, categories }) {
	return {
		posts: posts,
	};
}

export default connect(mapStateToProps, { newComment })(NewComment);
