import React from 'react'
import { connect } from 'react-redux'
import { Video } from '../components'
import { fetchVideo, fetchVideoSuccess, fetchVideoFailure } from '../actions/videos'
import { VIDEO_STATE_LOADED } from '../actions/videos'

const mapStateToProps = (state, ownProps) => {
  console.log('mapStateToProps', state);
  return {
    videoId: ownProps.params.videoId,
    videoData: state.video.data
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchVideo: (videoId) => {
      dispatch(fetchVideo(videoId)).then((response) => {
        !response.error ? dispatch(fetchVideoSuccess(response.payload)) : dispatch(fetchVideoFailure(response.payload));
      });
    },
    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Video)
