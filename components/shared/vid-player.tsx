// components/VideoPlayer.tsx
import React from "react";
import ReactPlayer from "react-player";

type VideoPlayerProps = {
  url: string;
  className?: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, className }) => {
  return (
    <ReactPlayer
      url={url}
      width="100%"
      height="100%"
      controls
      className={className}
    />
  );
};

export default VideoPlayer;
