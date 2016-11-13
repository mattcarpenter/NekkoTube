import React from 'react'
import { connect } from 'react-redux'
import Search from '../components/Search'
import { searchVideos, searchVideosSuccess, searchVideosFailure } from '../actions/videos'

const mapStateToProps = (state, ownProps) => {
    return {
        searchResults: state.video.searchResults
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSearch: (query) => {
            dispatch(searchVideos(query)).then((response) => {
                !response.error ? dispatch(searchVideosSuccess(response.payload)) : dispatch(searchVideosFailure(response.payload));
            });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
