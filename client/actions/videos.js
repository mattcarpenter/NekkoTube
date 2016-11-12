import axios from 'axios';

export const FETCH_VIDEO = 'FETCH_VIDEO';
export const FETCH_VIDEO_SUCCESS = 'FETCH_VIDEO_SUCCESS';
export const FETCH_VIDEO_FAILURE = 'FETCH_VIDEO_FAILURE';

export const VIDEO_STATE_LOADING = 'VIDEO_STATE_LOADING';
export const VIDEO_STATE_LOADED = 'VIDEO_STATE_LOADED';

export const SET_VIDEO_STATE = 'SET_VIDEO_STATE';
export const VIDEO_STATE_PLAYING = 'VIDEO_STATE_PLAYING';
export const VIDEO_STATE_PAUSED = 'VIDEO_STATE_PAUSED';

export const TOGGLE_LATCHED = 'TOGGLE_LATCHED';
export const VIDEO_LATCHED_TRUE = 'VIDEO_LATCHED_TRUE';
export const VIDEO_LATCHED_FALSE = 'VIDEO_LATCHED_FALSE';

export function fetchVideo(videoId) {
	const request = axios({
		method: 'get',
		url: '/video?videoId=' + videoId,
		headers: []
	});

	return {
		type: FETCH_VIDEO,
		payload: request
	};
}

export function fetchVideoSuccess(video) {
	return {
		type: FETCH_VIDEO_SUCCESS,
		payload: video
	};
}

export function fetchVideoFailure(error) {
	console.log('fetch fail');
	return {
		type: FETCH_VIDEO_FAILURE,
		payload: error
	};
}

export function setVideoState(state) {
	return {
		type: SET_VIDEO_STATE,
		state: state
	};
}

export function toggleLatched() {
	return {
		type: TOGGLE_LATCHED
	};
}
