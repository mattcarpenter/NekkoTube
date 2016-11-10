import { SET_PLAYER_STATE, PLAYER_STATE_LOADING } from '../actions/player'

const initialState = {
  	state: PLAYER_STATE_LOADING
};

export default function update(state = initialState, action) {
  if(action.type === SET_PLAYER_STATE) {
  	console.log('setting player state:', action.state);
    return { ...state, state: action.state };
  }

  return state
}
