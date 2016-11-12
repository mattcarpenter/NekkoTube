import React from 'react'
import { connect } from 'react-redux'
import CaptionWord  from '../components/CaptionWord'
import { setVideoState, toggleLatched } from '../actions/videos'
import { setDictionaryWord } from '../actions/dictionary'

const mapStateToProps = (state, ownProps) => {
  return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setVideoState: (state) => {
      dispatch(setVideoState(state));
    },

    toggleLatched: () => {
    	dispatch(toggleLatched());
    },

    setDictionaryWord: (word) => {
    	dispatch(setDictionaryWord(word));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CaptionWord)
