import {
	CLEAR_PROFILE,
	GET_ALL_PROFILES,
	GET_PROFILE,
	GET_GITHUB_REPOS,
	PROFILE_ERROR,
	UPDATE_PROFILE,
} from '../actions/types';

const initialState = {
	profile: null,
	profiles: [],
	repos: [],
	loading: true,
	error: {},
};

export default function profile(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE:
		case UPDATE_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false,
			};
		case GET_ALL_PROFILES:
			return {
				...state,
				profiles: payload,
				loading: false,
			};
		case GET_GITHUB_REPOS:
			return {
				...state,
				repos: payload,
				loading: false,
			};
		case PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
				profile: null,
			};
		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				repos: [],
				loading: false,
			};
		default:
			return state;
	}
}
