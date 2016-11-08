import React from 'react'
import { connect } from 'react-redux'
import { Video } from '../components'
import { fetchVideo, fetchVideoSuccess, fetchVideoFailure } from '../actions/videos'

const mapStateToProps = (state, ownProps) => {
  console.log('VideoContainer mapStateToProps');
  return {
    videoId: ownProps.params.videoId
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('VideoContainer mapDispatchToProps');
  return {
    fetchVideo: (videoId) => {
      dispatch(fetchVideo(videoId)).then((response) => {
        !response.error ? dispatch(fetchVideoSuccess(response.payload)) : dispatch(fetchVideoFailure(response.payload));
      });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Video)
