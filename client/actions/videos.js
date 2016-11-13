import axios from 'axios';

export const FETCH_VIDEO = 'FETCH_VIDEO';
export const FETCH_VIDEO_SUCCESS = 'FETCH_VIDEO_SUCCESS';
export const FETCH_VIDEO_FAILURE = 'FETCH_VIDEO_FAILURE';

export const SEARCH_VIDEOS = 'SEARCH_VIDEOS';
export const SEARCH_VIDEOS_SUCCESS = 'SEARCH_VIDEOS_SUCCESS';
export const SEARCH_VIDEOS_FAILURE = 'SEARCH_VIDEOS_FAILURE';

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

export function searchVideos(query) {
	const request = axios({
		method: 'get',
		url: '/search?query=' + encodeURIComponent(query),
		headers: []
	});

	return {
		type: SEARCH_VIDEOS,
		payload: request
	};
}

export function searchVideosSuccess(video) {
	return {
		type: SEARCH_VIDEOS_SUCCESS,
		payload: video
	};
}

export function searchVideosFailure(error) {
	return {
		type: SEARCH_VIDEOS_FAILURE,
		payload: error
	};
}
