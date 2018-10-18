import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as Actions from '../../Redux/Actions/Posts';

import imageLogo from '../../Images/Logo.jpg';
import imageNewPost from '../../Images/NewPost.png';

import './styles.css';

class AppHeader extends Component {
	render() {
		const { categories, sortPost } = this.props;
		return (
			<div className='AppHeader'>
				<div className='header'>
					<Link className='new-post' to='/new'>
						<img src={imageNewPost} width='40' height='40' alt='New Post Button' />
					</Link>
					<Link className='home' to="/">
						<img src={imageLogo} width='200' height='48' alt='Logo' />
					</Link>
				</div>

				<div className='filters'>
					<div className='category-changer'>
						<p>Choose Category</p>
						{categories && categories.map(category => (
							<Link key={category.name} to={`/${category.path}`}>
								<button>{category.name}</button>
							</Link>
						))}
					</div>

					<div className='sort-changer'>
						<p>Sort By</p>
						<button onClick={() => sortPost('timestamp')}>Time</button>
						<button onClick={() => sortPost('voteScore')}>Vote Score</button>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ categories }) {
	return {
		categories,
	};
}

export default withRouter(connect(mapStateToProps, Actions)(AppHeader));