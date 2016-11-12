import React from 'react'
import { connect } from 'react-redux'
import CaptionWord  from '../components/CaptionWord'
import { setPlayerState, playerTimeChanged } from '../actions/player'

const mapStateToProps = (state, ownProps) => {
  return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setPlayerState: (state) => {
      dispatch(setPlayerState(state));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CaptionWord)
