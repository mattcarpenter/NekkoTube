import React from 'react'
import { connect } from 'react-redux'
import Transport from '../components/Transport'

const mapStateToProps = (state, ownProps) => {
  return {
    currentTime: state.player.time
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Transport)
