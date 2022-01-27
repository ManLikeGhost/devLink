import axios from 'axios';
import { setAlert } from './alert';

import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST } from './types';

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

// Add Likes
export const addLike = (postId) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/post/like/${postId}`);
		dispatch({
			type: UPDATE_LIKES,
			payload: { postId, likes: res.data },
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Remove Likes
export const removeLike = (postId) => async (dispatch) => {
	try {
		const res = await axios.put(`/api/post/unlike/${postId}`);
		dispatch({
			type: UPDATE_LIKES,
			payload: { postId, likes: res.data },
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Delete Post
export const deletePost = (postId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/post/${postId}`);
		dispatch({
			type: DELETE_POST,
			payload: postId,
		} );
		
		dispatch( 
			setAlert('Post Removed', 'success')
		)
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};


// Add Post
export const addPost = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}
	
	try {
		const res = await axios.post( '/api/post', formData, config );
		
		dispatch({
			type: ADD_POST,
			payload: res.data,
		} );
		
		dispatch( 
			setAlert('Post Created', 'success')
		)
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};


