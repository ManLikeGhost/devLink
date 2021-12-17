import axios from 'axios';
import { setAlert } from './alert';

import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from './types';

// Get posts
export const getPosts = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/post');
		dispatch({
			type: GET_POSTS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
// Update Likes 
export const addLike = (id) => async ( dispatch ) => {
	try {
		const res = await axios.put( `/api/post/like/${ id }` );
		dispatch( {
			type: UPDATE_LIKES,
			payload: res.data
		})
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
}