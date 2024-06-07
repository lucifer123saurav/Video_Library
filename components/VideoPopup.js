import React from 'react';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';
const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
`;



const VideoPopup = ({ video, onClose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [video]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded">
        <button onClick={onClose} className="mb-4 text-red-500">Close</button>
        <video ref={videoRef} src={video} controls className="w-full"></video>
      </div>
    </div>
  );
};

export default VideoPopup;
