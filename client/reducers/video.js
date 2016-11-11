import { FETCH_VIDEO_SUCCESS, FETCH_VIDEO_FAILURE, VIDEO_STATE_LOADING, VIDEO_STATE_LOADED } from '../actions/videos'
import { PLAYER_TIME_CHANGED } from '../actions/player'

const initialState = {
  	state: VIDEO_STATE_LOADING,
  	currentCaption: null
};

export default function update(state = initialState, action) {
  if (action.type === FETCH_VIDEO_SUCCESS) {
  	console.log('fetch video succcess. action:', action);
    return { ...state, state: VIDEO_STATE_LOADED, data: action.payload.data };
  }

  if (action.type === PLAYER_TIME_CHANGED) {
  	var currentCaption;
  	var currentTime = action.time;

  	// Player time changed; update current caption
  	state.data.captionData.forEach(function (caption) {
  		if (currentTime > caption.start && currentTime < caption.end) {
  			currentCaption = caption;
  		}
  	});

  	return { ...state, currentCaption: currentCaption };
  }

  return state
}
