import axios from 'axios';
import { setAlert } from './alert';

import {
	GET_PROFILE,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	DELETE_ACCOUNT,
	CLEAR_PROFILE,
} from './types';

// Fetch current user

export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('api/profile/me');

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Create or Update a profile

export const createProfile = (formData, history, edit = false) => async (
	dispatch
) => {
	try {
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post('/api/profile', formData, config);
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
		dispatch(
			setAlert(
				edit ? 'Profile was updated!!' : 'Created new profile successfully!!',
				'success'
			)
		);

		if (!edit) {
			history.push('/dashboard');
		}
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Add Experience

export const addExperience = (formData, history) => async (dispatch) => {
	try {
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put('/api/profile/experience', formData, config);
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});
		dispatch(setAlert('Experience Added!!', 'success'));

		history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Add Education

export const addEducation = (formData, history) => async (dispatch) => {
	try {
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.put('/api/profile/education', formData, config);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Education added', 'success'));
		history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Delete Experience

export const deleteExperience = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`api/profile/experience/${id}`);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Experience Deleted!!', 'success'));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Delete Education

export const deleteEducation = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`api/profile/education/${id}`);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert('Education Deleted!!', 'success'));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

// Delete Account
export const deleteAccount = () => async (dispatch) => {
	if (window.confirm('Are you sure you want to continue to do this ?')) {
		try {
			// eslint-disable-next-line no-unused-vars
			const res = await axios.delete('/api/profile');

			dispatch({
				type: DELETE_ACCOUNT,
			} );
			
			dispatch({
				type: CLEAR_PROFILE,
			} );
			
			dispatch(setAlert('Your Account has been permanently deleted!!', 'success'));
		} catch (error) {}
	}
};
