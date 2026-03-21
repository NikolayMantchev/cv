
import CV_DATA from '../../../CV_DATA';
import sandyLoading from '../assets/Sandy Loading.webm';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <video
          className="loading-video"
          src={sandyLoading}
          autoPlay
          loop
          muted
          playsInline
        />
        <h1 className="loading-title">{CV_DATA.personal.name}</h1>
        <p className="loading-subtitle">{CV_DATA.personal.title}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;