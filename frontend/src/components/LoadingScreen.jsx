import React from 'react';
import CV_DATA from '../../../CV_DATA';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loader">
          <div className="loader-ring"></div>
          <div className="loader-ring"></div>
          <div className="loader-ring"></div>
          <div className="loader-dot"></div>
        </div>
        <h1 className="loading-title">{CV_DATA.personal.name}</h1>
        <p className="loading-subtitle">{CV_DATA.personal.title}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;