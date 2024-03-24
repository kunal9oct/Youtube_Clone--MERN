import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ className, src, srcURL }) => {
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const handleDoubleTap = (event) => {
    event.preventDefault();

    if (event.detail === 2) {
      const containerWidth = containerRef.current.offsetWidth;
      const positionX =
        event.nativeEvent.pageX - containerRef.current.offsetLeft;
      const percentage = (positionX / containerWidth) * 100;

      if (percentage <= 33) {
        // Double tap on the left side
        videoRef.current.seekTo(Math.max(0, position - 10));
      } else if (percentage > 66) {
        // Double tap on the right side
        videoRef.current.seekTo(
          Math.min(videoRef.current.getDuration(), position + 10)
        );
      } else {
        // Double tap in the middle
        setPlaying(!playing);
      }
    }
  };

  const handleProgress = (state) => {
    setPosition(state.playedSeconds);
  };

  return (
    <div
      ref={containerRef}
      // onDoubleClick={handleDoubleTap}
      onClick={handleDoubleTap}
      className={className}
    >
      <ReactPlayer
        ref={videoRef}
        url={(src && `https://youtube-clone-4ea3.onrender.com/${src}`) || (srcURL && `https://youtube-clone-4ea3.onrender.com/uploads/videos/${srcURL}`)}
        playing={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        width="100%"
        height="100%"
        controls={true}
        onProgress={handleProgress}
      />
    </div>
  );
};

export default VideoPlayer;
