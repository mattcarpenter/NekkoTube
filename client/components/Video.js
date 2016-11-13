import React from 'react'
import YouTube from 'react-youtube'
import TransportContainer from '../containers/TransportContainer'
import CaptionsContainer from '../containers/CaptionsContainer'
import DictionaryContainer from '../containers/DictionaryContainer'

import { PLAYER_STATE_LOADED, PLAYER_STATE_LOADING, PLAYER_STATE_PLAYING, PLAYER_STATE_PAUSED } from '../actions/player'
import { VIDEO_STATE_PLAYING, VIDEO_STATE_PAUSED } from '../actions/videos';

const TICK_INTERVAL = 100;
const SUB_TICK_INTERVAL = 10;
const YOUTUBE_STATE_PLAYING = 1;
const YOUTUBE_STATE_PAUSED = 2;
const MILLIS_PER_SECOND = 1000;

const PLAYER_TIME_UPDATE_INTERVAL = 500;

var t = 0;

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

    this.state = {
      warmingUp: true,
      lastReferenceTime: 0,
      lastStartedPlayingAt: 0
    };

    // Reset player state
    props.onPlayerTimeChange(0);
    props.onVideoStateChange(PLAYER_STATE_LOADING);
  }

  componentDidMount() {
    this.props.fetchVideo(this.props.videoId);
  }

  /**
   * Grabs current time from the YouTube player and updates application state
   */
  tick() {
    var time = 0;

    if (this.state.warmingUp) {
      // Player is warming up. Grab the media reference time more frequently.
      time = this.player.getMediaReferenceTime();

      if (this.state.lastReferenceTime !== time) {
        // Player started. Capture the current timestamp for calculating an
        // approximate player time each tick.
        this.state.lastStartedPlayingAt = (new Date()).getTime();
        this.state.warmingUp = false;
      }
      this.state.lastReferenceTime = time;
    } else {
      // Player is playing. Calculate an approximate media reference time.
      time = this.state.lastReferenceTime + ((new Date()).getTime() - this.state.lastStartedPlayingAt) / MILLIS_PER_SECOND;
    }
    this.props.onPlayerTimeChange(time);
    if (this.props.playerState === PLAYER_STATE_PLAYING) {
      setTimeout(this.tick.bind(this), TICK_INTERVAL);
    }
  }

  /**
   * Invoked when props passed to this component have changed
   * @param {object} prevProps previous props
   */
  componentDidUpdate(prevProps) {

    // Any time the player state changes, set warmingUp true
    if (prevProps.playerState !== this.props.playerState) {
      this.state.warmingUp = true;
    }

    // Auto-play the video once the captions and video have both loaded.
    if (prevProps.playerState === PLAYER_STATE_LOADING
      && this.props.playerState === PLAYER_STATE_LOADED) {
      this.player.playVideo();
    }

    // Start ticking if player state changes from `not playing` to `playing`.
    if (prevProps.playerState !== PLAYER_STATE_PLAYING
      && this.props.playerState === PLAYER_STATE_PLAYING) {
      this.tick();
    }

    // Pause the player if the video state changes from playing to paused
    if (prevProps.videoState === VIDEO_STATE_PLAYING
      && this.props.videoState === VIDEO_STATE_PAUSED) {
      this.player.pauseVideo();
    }

    // Start the player if the video state changes from paused to playing
    if (prevProps.videoState === VIDEO_STATE_PAUSED
      && this.props.videoState === VIDEO_STATE_PLAYING) {
      this.player.playVideo();
    }
    
  }

  seek(time) {
    this.state.warmingUp = true;
    this.player.seekTo(time, true);
    this.props.onVideoStateChange(PLAYER_STATE_LOADING);
  }

  /** 
   * Called when the YouTube player is ready
   * @param {object} event
   */
  onReady(event) {
    // store reference to player so we can programatically play/pause/seek
    this.player = event.target;
    this.props.onVideoStateChange(PLAYER_STATE_LOADED);
  }

  /**
   * Invoked when the YouTube player state has changed
   * @param {object} event
   */
  onStateChange(event) {
    if (event.data === YOUTUBE_STATE_PAUSED) {
      this.props.onVideoStateChange(PLAYER_STATE_PAUSED);
      this.props.setVideoState(VIDEO_STATE_PAUSED);
    }

    if (event.data === YOUTUBE_STATE_PLAYING) {
      this.props.onVideoStateChange(PLAYER_STATE_PLAYING);
      this.props.setVideoState(VIDEO_STATE_PLAYING);
    }
  }

  render() {
    return (
      <div style={{ ...styles.container, width: Number(opts.width) }}>
        <YouTube
          style={styles.video}
          videoId={this.props.videoId}
          opts={opts}
          onReady={this.onReady.bind(this)}
          onStateChange={this.onStateChange.bind(this)}
        />
        <TransportContainer
          width={Number(opts.width)}
          onSeek={this.seek.bind(this)}
          searchTerms={this.props.searchTerms}
        />
        <CaptionsContainer/>
        <DictionaryContainer/>
      </div>
    );
  }
}

const styles = {
  video: {
    marginBottom: 15
  },
  container: {
    display: 'flex',
    flexDirection: 'column'
  }
};

export default Video
