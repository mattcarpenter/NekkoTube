import React from 'react'
import { connect } from 'react-redux'
import Captions from '../components/Captions'

const mapStateToProps = (state, ownProps) => {
    return {
        caption: state.video.currentCaption
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Captions)
