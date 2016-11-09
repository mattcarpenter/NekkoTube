import { UPDATE_PLAYER_STATE, PLAYER_STATE_READY, PLAYER_STATE_LOADING } from '../actions/youtubePlayer'

const initialState = {
  	state: PLAYER_STATE_LOADING
};

export default function update(state = initialState, action) {
  if(action.type === UPDATE_PLAYER_STATE) {
    return { ...state, state: action.state };
  }

  return state
}
