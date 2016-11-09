import { FETCH_VIDEO_SUCCESS, FETCH_VIDEO_FAILURE, VIDEO_STATE_LOADING, VIDEO_STATE_LOADED } from '../actions/videos'

const initialState = {
  	state: VIDEO_STATE_LOADING
};

export default function update(state = initialState, action) {
  if(action.type === FETCH_VIDEO_SUCCESS) {
    return { ...state, state: VIDEO_STATE_LOADED };
  }

  return state
}
