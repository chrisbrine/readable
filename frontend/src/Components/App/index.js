import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import AppHeader from '../AppHeader';
import AppHome from '../ShowCategory';
import App404 from '../App404';
import ShowPostDetail from '../ShowPostDetail';
import ShowCategory from '../ShowCategory';
import EditPost from '../EditPost';
import EditComment from '../EditComment';
import NewPost from '../NewPost';
import NewComment from '../NewComment';

import { getCategories } from '../../Redux/Actions/Categories';

import './styles.css';

class App extends Component {
	componentDidMount () {
		this.props.dispatch(getCategories());
	}
	render() {
		return (
			<div className='App'>
				<AppHeader />

				<section>
					<Switch>
						<Route exact path='/' component={AppHome} />
						<Route exact path='/new' component={NewPost} />
						<Route exact path='/:category' component={ShowCategory} />
						<Route exact path='/:category/:postId' component={ShowPostDetail} />
						<Route path='/:category/new' component={NewPost} />
						<Route path='/:category/:postId/edit' component={EditPost} />
						<Route path='/:category/:postId/comment' component={NewComment} />
						<Route path='/:category/:postId/:commentId/new' component={NewComment} />
						<Route path='/:category/:postId/:commentId/edit' component={EditComment} />
						<Route path='/' component={App404} />
					</Switch>
				</section>
			</div>
		);
	}
}

export default withRouter(connect()(App));
