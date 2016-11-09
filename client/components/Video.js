import React from 'react'
import YouTube from 'react-youtube'

import { PLAYER_STATE_READY } from '../actions/youtubePlayer'

const opts = {
    height: '390',
    width: '640',
    playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
    }
 };

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchVideo(this.props.videoId);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.playing && this.props.playing) {
      this.state.player.playVideo();
    }
  }

  onReady(event) {
    // store reference to player so we can programatically play/pause/seek
    this.state.player = event.target;

    // Set the player state to `ready` in the Redux store
    this.props.updatePlayerState(PLAYER_STATE_READY);

    //console.log(event.target.getMediaReferenceTime());
  }

  render() {
    return (
      <YouTube
        videoId={this.props.videoId}
        opts={opts}
        onReady={this.onReady.bind(this)}
      />
    );
  }
}

export default Video
