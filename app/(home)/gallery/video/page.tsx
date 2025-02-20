"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { VideoGalleryType } from "@/types/contents/home";

const VideoGallery = () => {
  const {
    data: videos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const response = await client.api.home["video-gallery"].$get();
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Video Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="aspect-video bg-gray-200 animate-pulse" />
                <div className="p-2">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">
            Failed to load videos. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!videos || !videos.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600">No Videos Found</h2>
        </div>
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
  const getYouTubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(video.videoUrl);

  if (!videoId) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
        <p className="text-red-600">Invalid YouTube URL</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
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
