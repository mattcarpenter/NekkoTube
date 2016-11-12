import { FETCH_VIDEO_SUCCESS, FETCH_VIDEO_FAILURE, VIDEO_STATE_LOADING,
         VIDEO_STATE_LOADED, VIDEO_STATE_PLAYING, VIDEO_STATE_PAUSED,
         SET_VIDEO_STATE, VIDEO_LATCHED_TRUE, VIDEO_LATCHED_FALSE, TOGGLE_LATCHED } from '../actions/videos'
import { PLAYER_TIME_CHANGED } from '../actions/player'

const initialState = {
    state: VIDEO_STATE_LOADING,
    currentCaption: null,
    latched: VIDEO_LATCHED_FALSE
};

export default function update(state = initialState, action) {
  if (action.type === FETCH_VIDEO_SUCCESS) {
    console.log('fetch video succcess. action:', action);

    // Generate a words object array for each line
    parseCaptions(action.payload.data.captionData);

    return { ...state, state: VIDEO_STATE_LOADED, data: action.payload.data };
  }

  if (action.type === PLAYER_TIME_CHANGED) {
    var currentCaption;
    var currentTime = action.time;

    // Player time changed; update current caption
    state.data.captionData.forEach(function (caption) {
        if (currentTime > caption.start && currentTime < caption.end) {
            currentCaption = caption;
        }
    });

    return { ...state, currentCaption: currentCaption };
  }

  if (action.type === TOGGLE_LATCHED) {
    return { ...state, latched: state.latched === VIDEO_LATCHED_TRUE ? VIDEO_LATCHED_FALSE : VIDEO_LATCHED_TRUE };
  }

  if (action.type === SET_VIDEO_STATE) {
    if (state.latched === VIDEO_LATCHED_TRUE) {
        return state;
    }
    
    return { ...state, state: action.state };
  }

  return state
}

function parseCaptions(lines) {
    lines.forEach(function (line) {
        var lineWords = [];
        var tokens = (line.inverted || '').split(' ');
        tokens.forEach(function (token) {
            lineWords.push({
                word: token,
                senses: getSenses(line.definitions, token),
                particle: isParticle(line.definitions, token)
            });
        });
        line.words = lineWords;
    });
}

function getSenses(definitions, token) {
    var senses = [];

    (definitions || []).forEach(function (definition) {
        if (definition.word === token) {
            senses = definition.senses;
        }
    });

    return senses;
}

function isParticle(definitions, token) {
    var particle = false;

    (definitions || []).forEach(function (definition) {
        if (definition.word === token) {
            particle = particle || definition.particle;
        }
    });

    return particle;
}