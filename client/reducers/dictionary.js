import { SET_DICTIONARY_WORD } from '../actions/dictionary'

const initialState = {
  	word: {}
};

export default function update(state = initialState, action) {
  if (action.type === SET_DICTIONARY_WORD) {
    return { ...state, word: action.word };
  }
 
  return state
}
