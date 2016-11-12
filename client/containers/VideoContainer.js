import React from 'react'
import { connect } from 'react-redux'
import Video  from '../components/Video'
import { fetchVideo, fetchVideoSuccess, fetchVideoFailure, setVideoState } from '../actions/videos'
import { setPlayerState, playerTimeChanged } from '../actions/player'
import { VIDEO_STATE_LOADED } from '../actions/videos'

const mapStateToProps = (state, ownProps) => {
  return {
    videoId: ownProps.params.videoId,
    videoData: state.video.data,
    playerState: state.player.state,
    currentTime: state.player.time,
    videoState: state.video.state,
    searchTerms: (ownProps.location.query.words || '').split(',')
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchVideo: (videoId) => {
      dispatch(fetchVideo(videoId)).then((response) => {
        !response.error ? dispatch(fetchVideoSuccess(response.payload)) : dispatch(fetchVideoFailure(response.payload));
      });
    },

    onVideoStateChange: (state) => {
      dispatch(setPlayerState(state));
    },

    onPlayerTimeChange: (time) => {
      dispatch(playerTimeChanged(time));
    },

    setVideoState: (state) => {
      dispatch(setVideoState(state));
    }

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Video)
