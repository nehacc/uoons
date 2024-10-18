import animationData from "../assets/download (1).png";

   
const ShareComponent = () => {
  // Function to handle sharing
  const handleShare = () => {
    if (navigator.share) {
      // If Web Share API is supported
      navigator
        .share({
          title: document.title, // Optional: Share the document's title
          text: "Check out this page!",
          url: window.location.href, // The current page URL
        })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  return (
    <div className="pdtestshareIcon" onClick={handleShare} style={{ cursor: "pointer" }}>
      <div style={{ width: "30px", height: "40px" }}>
        <img src={animationData} alt="Share Icon" />
      </div>
    </div>
  );
};

export default ShareComponent;
