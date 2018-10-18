import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import logger from './Logger';

export default applyMiddleware(
	logger,
	thunk,
);