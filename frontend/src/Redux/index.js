import { createStore } from 'redux';

import Reducer from './Reducers';
import Middleware from './Middleware';

const Store = createStore(
	Reducer,
	Middleware,
);

export default Store;