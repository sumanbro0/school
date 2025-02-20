import React from "react";
import { client } from "@/lib/hono";
import { VideoGalleryType } from "@/types/contents/home";

const VideoGallery = async () => {
  const pageData = await client.api.home["video-gallery"].$get();

  if (!pageData.ok) {
    return <div>Page not found</div>;
  }

  const videos = await pageData.json();

  if (!videos || !videos.data) {
    return (
      <div className="mx-auto text-center min-h-screen my-auto">
        Videos Not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Video Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.data.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

const VideoCard = ({ video }: { video: VideoGalleryType }) => {
  // Extract YouTube video ID from the URL
  const getYouTubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(video.videoUrl);

  if (!videoId) {
    return <div>Invalid YouTube URL</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      <div className="p-2">
        <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
        {video.subTitle && (
          <p className="text-sm text-gray-600">{video.subTitle}</p>
        )}
      </div>
    </div>
  );
};

export default VideoGallery;
