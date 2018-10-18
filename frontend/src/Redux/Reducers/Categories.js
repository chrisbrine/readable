import * as Type from '../Actions/Types';

export default function categories ( state = [], action ) {
	switch(action.type) {
		case Type.GET_CATEGORIES:
			return [ ...action.res.categories ];
		default:
			return state;
	}
}
