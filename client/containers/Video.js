import React from 'react'
import { connect } from 'react-redux'
import { Player } from '../components'

class Video extends React.Component {
  componentDidMount() {
    this.setState({
      videoId: this.props.params.videoId
    });
  }

  render() {
    return (
      <div>
        Hello
        <Player videoId={this.props.params.videoId}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    //active: ownProps.filter === state.visibilityFilter
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
}

Video = connect(mapStateToProps, mapDispatchToProps)(Video)

export default Video 
