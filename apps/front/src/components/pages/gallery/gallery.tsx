import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import PhotoGallery from "./photo-gallery";

interface VideoGalleryProps {
  videos: string[];
}

const videos: VideoGalleryProps["videos"] = [
  "https://www.youtube.com/embed/0A8g8xkCqbA",
  "https://www.youtube.com/embed/bKFE85G9Z-g",
  "https://www.youtube.com/embed/gxaLS_gZjro",
  "https://www.youtube.com/embed/6mNFBVnEGLk",
  "https://www.youtube.com/embed/Pus7uxs2OqM",
  "https://www.youtube.com/embed/Gg5rXrfHL8M",
  "https://www.youtube.com/embed/lOTN39wO5v0",
];

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Extract video ID from YouTube URL for thumbnail
  const getVideoId = (url: string) => {
    const match = url.match(/embed\/([^?]+)/);
    return match ? match[1] : "";
  };

  const getAutoplayUrl = (url: string) => {
    const hideParams =
      "&modestbranding=1&showinfo=0&rel=0&controls=0&disablekb=1&fs=1&iv_load_policy=3&cc_load_policy=0&playsinline=1&widget_referrer=0";
    if (url.includes("?")) {
      return `${url}&autoplay=1&mute=1&loop=1&playlist=${getVideoId(url)}${hideParams}`;
    }
    return `${url}?autoplay=1&mute=1&loop=1&playlist=${getVideoId(url)}${hideParams}`;
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Featured Video Section */}
        {videos.length > 0 && (
          <div className="relative">
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={getAutoplayUrl(videos[0])}
                title="Featured Video"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </div>
        )}
        {/* <PhotoGallery /> */}

        <div className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Video Gallery
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Explore our collection of featured videos
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.slice(1).map((videoUrl, index) => (
                <Card
                  key={index + 1}
                  className="group cursor-pointer overflow-hidden bg-white border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-0"
                  onClick={() => setSelectedVideo(videoUrl)}
                >
                  <div className="relative aspect-video bg-slate-100 overflow-hidden">
                    <iframe
                      src={getAutoplayUrl(videoUrl)}
                      title={`Video ${index + 2}`}
                      className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full w-10 h-10 backdrop-blur-sm"
              onClick={() => setSelectedVideo(null)}
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Video Iframe */}
            <iframe
              src={getAutoplayUrl(selectedVideo)}
              title="Selected Video"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
