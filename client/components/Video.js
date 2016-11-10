import React from 'react'
import YouTube from 'react-youtube'

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
    // props may have been updated with video data
    if (this.player && this.props.videoData && this.state.pendingAutoplay) {
      this.state.pendingAutoplay = false;
      this.player.playVideo();
    }
  }

  onReady(event) {
    // store reference to player so we can programatically play/pause/seek
    this.player = event.target;
    if (this.props.videoData) {
      this.player.playVideo();
    }
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
