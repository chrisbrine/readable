import React, { Component } from 'react';
import { connect } from 'react-redux';

import { newPost } from '../../Redux/Actions/Posts';
import { guid } from '../../Utils/Helpers';

import './styles.css';

class NewPost extends Component {
	addNewPost = (e) => {
		e.preventDefault();

		const submitPost = {
			id: guid(),
			timestamp: Date.now(),
			title: e.target.title.value,
			body: e.target.body.value,
			author: e.target.author.value,
			category: e.target.category.value,
		};
		this.props.newPost(submitPost, () => this.props.history.push('/'));
	}
	render() {
		return (
			<div className="NewPost">
				<form onSubmit={this.addNewPost}>
					<h2>New Post</h2>
					<ul className="form-style-1">
						<li>
							<label>Name <span className="required">*</span></label>
							<input type="text" name="author" className="field-long" />
						</li>
						<li>
							<label>Title <span className="required">*</span></label>
							<input type="text" name="title" className="field-long" />
						</li>
						<li>
							<label>Category </label>
							<select name="category" className="field-select">
								{this.props.categories && this.props.categories.map((category) => (
									<option key={category.name} value={category.name}>{category.name}</option>
								))}
							</select>
						</li>
						<li>
							<label>Post <span className="required">*</span></label>
							<textarea name="body" id="field5" className="field-long field-textarea"></textarea>
						</li>
						<button>Submit </button>
					</ul>
				</form>
			</div>
		);
	}
}

function mapStateToProps({ posts, categories }) {
	return {
		posts: posts,
		categories: categories
	};
}

export default connect(mapStateToProps, { newPost })(NewPost);
