export const SET_PLAYER_STATE = 'SET_PLAYER_STATE';
export const PLAYER_TIME_CHANGED = 'PLAYER_TIME_CHANGED';
export const PLAYER_STATE_LOADING = 'PLAYER_STATE_LOADING';
export const PLAYER_STATE_LOADED = 'PLAYER_STATE_LOADED';
export const PLAYER_STATE_PLAYING = 'PLAYER_STATE_PLAYING';
export const PLAYER_STATE_PAUSED = 'PLAYER_STATE_PAUSED';

export function setPlayerState(state) {
	return {
		type: SET_PLAYER_STATE,
		state: state
	};
}

export function playerTimeChanged(time) {
	return {
		type: PLAYER_TIME_CHANGED,
		time: time
	};
}
