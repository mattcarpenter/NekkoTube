import React from 'react'
import YouTube from 'react-youtube'
import { PLAYER_STATE_LOADED, PLAYER_STATE_LOADING, PLAYER_STATE_PLAYING, PLAYER_STATE_PAUSED } from '../actions/player'

const TICK_INTERVAL = 250;
const YOUTUBE_STATE_PLAYING = 1;
const YOUTUBE_STATE_PAUSED = 2;

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

  tick() {
    this.props.onPlayerTimeChange(this.player.getMediaReferenceTime());
    if (this.props.playerState === PLAYER_STATE_PLAYING) {
      setTimeout(this.tick.bind(this), TICK_INTERVAL);
    }
  }

  componentDidUpdate(prevProps) {
    // Auto-play the video once the captions and video have both loaded.
    if (prevProps.playerState === PLAYER_STATE_LOADING
      && this.props.playerState === PLAYER_STATE_LOADED) {
      this.player.playVideo();
      this.props.onVideoStateChange(PLAYER_STATE_PLAYING);
    }

    // Start ticking if player state changes from `not plaing` to `playing`.
    if (prevProps.playerState !== PLAYER_STATE_PLAYING
      && this.props.playerState === PLAYER_STATE_PLAYING) {
      this.tick();
    }
  }

  onReady(event) {
    // store reference to player so we can programatically play/pause/seek
    this.player = event.target;
    this.props.onVideoStateChange(PLAYER_STATE_LOADED);

    //console.log(event.target.getMediaReferenceTime());
  }

  onStateChange(event) {
    if (event.data === YOUTUBE_STATE_PAUSED) {
      this.props.onVideoStateChange(PLAYER_STATE_PAUSED);
    }

    if (event.data === YOUTUBE_STATE_PLAYING) {
      this.props.onVideoStateChange(PLAYER_STATE_PLAYING);
    }
  }

  render() {
    return (
      <YouTube
        videoId={this.props.videoId}
        opts={opts}
        onReady={this.onReady.bind(this)}
        onStateChange={this.onStateChange.bind(this)}
      />
    );
  }
}

export default Video
