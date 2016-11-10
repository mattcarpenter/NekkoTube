import { SET_PLAYER_STATE, PLAYER_STATE_LOADING, PLAYER_TIME_CHANGED } from '../actions/player'

const initialState = {
  	state: PLAYER_STATE_LOADING,
  	time: 0
};

export default function update(state = initialState, action) {
  if (action.type === SET_PLAYER_STATE) {
    return { ...state, state: action.state };
  }

  if (action.type === PLAYER_TIME_CHANGED) {
  	return { ...state, time: action.time };
  }

  return state
}
