import Lottie from "lottie-react";
import animationData from "../assets/Animation - 1729158150695.json";

// Import the Lottie library

const LoadingComponent = () => {
  return (

    <div className="loadingComp">
    <div style={{ width: 100, height: 100 }}>
      <Lottie animationData={animationData} loop={true} />
    </div>
    </div>
  );
};

export default LoadingComponent;
