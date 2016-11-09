import axios from 'axios';

export const UPDATE_PLAYER_STATE = 'UPDATE_PLAYER_STATE';

export const PLAYER_STATE_READY = 'PLAYER_STATE_READY';
export const PLAYER_STATE_PLAYING = 'PLAYER_STATE_PLAYING';
export const PLAYER_STATE_PAUSEd = 'PLAYER_STATE_PAUSED';
export const PLAYER_STATE_BUFFERING = 'PLAYER_STATE_BUFFERING';
export const PLAYER_STATE_LOADING = 'PLAYER_STATE_LOADING';

export function updatePlayerState(playerState) {
	return {
		type: UPDATE_PLAYER_STATE,
		state: playerState
	};
}
