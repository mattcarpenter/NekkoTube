import React from 'react'
import YouTube from 'react-youtube'
import { PLAYER_STATE_LOADED, PLAYER_STATE_LOADING, PLAYER_STATE_PLAYING, PLAYER_STATE_PAUSED } from '../actions/player'

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
    this.state = { pendingAutoplay: true };
  }

  componentDidMount() {
    this.props.fetchVideo(this.props.videoId);
  }

  componentDidUpdate(prevProps) {
    // Auto-play the video once the captions and video have both loaded.
    if (prevProps.playerState === PLAYER_STATE_LOADING
      && this.props.playerState === PLAYER_STATE_LOADED) {
      this.player.playVideo();
      this.props.onVideoStateChange(PLAYER_STATE_PLAYING);
    }
  }

  onReady(event) {
    // store reference to player so we can programatically play/pause/seek
    this.player = event.target;
    this.props.onVideoStateChange(PLAYER_STATE_LOADED);

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
