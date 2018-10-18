import * as API from '../../API';
import * as Type from './Types';

export const getCategories = () => {
	return (dispatch) => {
		API.getCategories().then(res => {
			dispatch({
				type: Type.GET_CATEGORIES,
				res,
			});
		});
	};
};