import "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./styles/Home.css"; // Import the CSS file

const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <>
      <Navbar />
      <div className="home-container">
        {/* Main Content */}
        <div className="hero-section">
          <p className="title">CodeAI</p>
          <h1 className="tagline">Code flawlessly. Debug effortlessly. Build confidently.</h1>
          <p className="description">
            CodeAI makes debugging effortless with AI-powered error detection and
            smart fixes—so you can spend less time fixing and more time building.
          </p>
          
          {/* Start Now Button - Navigates to Code Editor */}
          <button className="start-btn" onClick={() => navigate("/review")}>
            Start Now
          </button>

          <p className="disclaimer">
            <i>CodeAI is here to help, but even AI can make mistakes. The better your code, the better the fix—write smart, debug smarter!</i>
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
