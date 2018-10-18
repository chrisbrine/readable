import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './Components/App';

import Store from './Redux';

import './styles.css';

ReactDOM.render(
	<BrowserRouter>
		<Provider store={Store}>
			<App />
		</Provider>
	</BrowserRouter>
, document.getElementById('root'));
