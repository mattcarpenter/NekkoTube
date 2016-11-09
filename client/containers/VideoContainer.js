import React from 'react'
import { connect } from 'react-redux'
import { Video } from '../components'
import { fetchVideo, fetchVideoSuccess, fetchVideoFailure } from '../actions/videos'
import { updatePlayerState } from '../actions/youtubePlayer'
import { PLAYER_STATE_READY } from '../actions/youtubePlayer'
import { VIDEO_STATE_LOADED } from '../actions/videos'

const mapStateToProps = (state, ownProps) => {
  return {
    videoId: ownProps.params.videoId,
    playing: state.player.state === PLAYER_STATE_READY && state.video.state === VIDEO_STATE_LOADED
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updatePlayerState: (playerState) => {
      dispatch(updatePlayerState(playerState));
    },
    fetchVideo: (videoId) => {
      dispatch(fetchVideo(videoId)).then((response) => {
        !response.error ? dispatch(fetchVideoSuccess(response.payload)) : dispatch(fetchVideoFailure(response.payload));
      });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Video)
