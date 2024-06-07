"use client"
import Head from 'next/head';
import { useState, useRef } from 'react';
import VideoList from '../components/VideoList';
import VideoPopup from '../components/VideoPopup';

export default function HomePage() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const fileInputRef = useRef(null);

  const addVideo = (file) => {
    const newVideo = {
      url: URL.createObjectURL(file),
      bookmarked: false,
    };
    setVideos([...videos, newVideo]);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the file input
    }
  };

  const toggleBookmark = (index) => {
    const updatedVideos = videos.map((video, i) =>
      i === index ? { ...video, bookmarked: !video.bookmarked } : video
    );
    setVideos(updatedVideos);
  };

  const filteredVideos = showBookmarks ? videos.filter(video => video.bookmarked) : videos;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <Head>
        <title>Video Library</title>
      </Head>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Video Library</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const file = e.target.elements.video.files[0];
            if (file) {
              addVideo(file);
            }
          }}
          className="mb-6"
        >
          <input type="file" name="video" accept="video/*" className="mb-2" ref={fileInputRef} />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Add Video
          </button>
        </form>
        <button
          onClick={() => setShowBookmarks(!showBookmarks)}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-6"
        >
          {showBookmarks ? 'Show All Videos' : 'Show Bookmarked Videos'}
        </button>
        <VideoList
          videos={filteredVideos}
          onVideoClick={(video) => {
            setSelectedVideo(video.url);
            setShowPopup(true);
          }}
          onBookmarkToggle={toggleBookmark}
        />
        {showPopup && (
          <VideoPopup
            video={selectedVideo}
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
    </div>
  );
}
