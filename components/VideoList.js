import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  margin-top: 20px;
`;

const VideoItem = styled.div`
  margin-bottom: 10px;
`;



export default function VideoList({ videos, onVideoClick, onBookmarkToggle }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video, index) => (
        <div key={index} className="relative">
          <video
            src={video.url}
            className="w-full h-auto rounded cursor-pointer"
            onClick={() => onVideoClick(video)}
          />
          <button
            onClick={() => onBookmarkToggle(index)}
            className={`absolute top-2 right-2 p-1 rounded ${
              video.bookmarked ? 'bg-yellow-500' : 'bg-gray-500'
            }`}
          >
            {video.bookmarked ? 'Unbookmark' : 'Bookmark'}
          </button>
        </div>
      ))}
    </div>
  );
}
