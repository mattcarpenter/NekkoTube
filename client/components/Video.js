import React from 'react'
import YouTube from 'react-youtube'

const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

function onReady(e) {
  var p = e.target
  setTimeout(function () {
    console.log(p);
    debugger;
  },4000);
}

export default function Foo() {
  return (
    <YouTube
        videoId="2g811Eo7K8U"
        opts={opts}
        onReady={onReady}
    />
  );
};
