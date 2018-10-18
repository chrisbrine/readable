import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPosts } from '../../Redux/Actions/Posts';

import ShowPost from '../ShowPost';
import App404 from '../App404';

import './styles.css';

class ShowCategory extends Component {
	componentDidMount() {
		this.props.getPosts();
	};
	render() {
		const { posts } = this.props;
		if (!this.props.catinfo && this.props.category !== undefined) {
			return <App404 />;
		}
		if (Object.keys(posts).length < 1) {
			return (
				<div className='ShowCategory'>
					<div className='posts-none'>
						<h2>{this.props.category}</h2>
						<div className='text'>
							There are no posts in that category.
						</div>
					</div>
				</div>
			);
		}
		return (
			<div className='ShowCategory'>
				<h2>{this.props.category}</h2>
				{posts.map(post => (
					<ShowPost key={post.id} post={post} />
				))}
			</div>
		);
	}
}

function mapStateToProps({ posts, categories }, { match }) {
	const category = match.params.category;
	let catinfo = false;
	for (let index = 0; index < categories.length; index++) {
		if (categories[index].name === category) {
			catinfo = category;
		}
	}
	console.log(category);
	console.log(catinfo);
	console.log(categories);
	return {
		catinfo,
		categories,
		category,
		posts: category
			? posts.filter(post => post.category === category)
			: posts,
	};
}

export default connect(mapStateToProps, { getPosts })(ShowCategory);
