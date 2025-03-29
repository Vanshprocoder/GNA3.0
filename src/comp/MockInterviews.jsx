import React, { useRef, useEffect, useState } from "react";
import { Mic, MicOff, Video, VideoOff, Phone, Subtitles, X, BarChart2 } from "lucide-react";
import InterviewAnalysis from "./InterviewAnalysis";

const MockInterviews = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isCaptionsOn, setIsCaptionsOn] = useState(false);
  const [captions, setCaptions] = useState("Hello!");
  const [showEndCallPopup, setShowEndCallPopup] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(userStream);
        if (videoRef.current) {
          videoRef.current.srcObject = userStream;
        }
      } catch (error) {
        console.error("Error accessing webcam: ", error);
      }
    };
    startVideo();
  }, []);

  useEffect(() => {
    // Simulate fetching analysis data from backend
    if (showAnalysis && !analysisData) {
      // Mock data for testing
      const mockAnalysisData = {
        overallScore: 85,
        confidence: 78,
        technicalScore: 92,
        communicationScore: 88,
        keyInsights: [
          "Strong technical knowledge demonstrated",
          "Good problem-solving approach",
          "Could improve eye contact during responses",
          "Excellent articulation of complex concepts"
        ],
        questionResponses: [
          {
            question: "Tell me about your background in software development",
            responseScore: 90,
            feedback: "Clear and concise response with relevant examples"
          },
          {
            question: "How would you approach debugging a complex issue?",
            responseScore: 85,
            feedback: "Good methodology but could be more systematic"
          },
          {
            question: "Explain a challenging project you worked on",
            responseScore: 88,
            feedback: "Excellent storytelling and technical breakdown"
          }
        ],
        improvementAreas: [
          "Confidence when discussing achievements",
          "Structuring responses more concisely",
          "Technical depth on system design questions"
        ]
      };
      
      // Simulate API delay
      setTimeout(() => {
        setAnalysisData(mockAnalysisData);
      }, 1000);
    }
  }, [showAnalysis, analysisData]);

  const toggleMic = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => (track.enabled = !isMicOn));
      setIsMicOn(!isMicOn);
    }
  };

  const toggleCamera = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => (track.enabled = !isCameraOn));
      setIsCameraOn(!isCameraOn);
    }
  };

  const toggleCaptions = () => {
    setIsCaptionsOn(!isCaptionsOn);
    if (isCaptionsOn) {
      setCaptions("");
    }
  };

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowEndCallPopup(true);
  };

  const viewAnalysis = () => {
    setShowEndCallPopup(false);
    setShowAnalysis(true);
  };

  const closePopup = () => {
    setShowEndCallPopup(false);
  };

  const backToCall = () => {
    setShowAnalysis(false);
    // Reset for new call
    const startVideo = async () => {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(userStream);
        if (videoRef.current) {
          videoRef.current.srcObject = userStream;
        }
        setIsMicOn(true);
        setIsCameraOn(true);
      } catch (error) {
        console.error("Error accessing webcam: ", error);
      }
    };
    startVideo();
  };

  if (showAnalysis) {
    return <InterviewAnalysis analysisData={analysisData} onBack={backToCall} />;
  }

  return (
    <div className="relative min-w-screen h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center">
      {/* Main content container */}
      <div className="w-full max-w-6xl h-full max-h-screen p-6 flex flex-col relative">
        {/* AI Avatar Section */}
        <div className="relative w-full h-4/5 bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
          <video 
            src="../src/assets/ai_video.mp4" 
            autoPlay 
            loop 
            muted 
            className="w-full h-full object-cover"
          />
          
          {/* Captions area */}
          {isCaptionsOn && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white text-center">
              {captions}
            </div>
          )}
        </div>
        
        {/* Candidate Video Feed */}
        <div className="absolute bottom-24 right-8 w-48 h-36 bg-gray-900 rounded-lg overflow-hidden shadow-lg border-2 border-gray-700 transition-all hover:scale-105">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover" 
          />
          
          {/* Video overlay when camera is off */}
          {!isCameraOn && (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <VideoOff size={48} className="text-gray-400" />
            </div>
          )}
        </div>
        
        {/* Controls */}
        <div className="mt-auto mb-4 flex items-center justify-center space-x-6">
          {/* Mic Button */}
          <div className="w-16 h-16 rounded-full overflow-hidden group">
            <button 
              onClick={toggleMic} 
              className={`w-16 h-16 flex items-center justify-center transition-all rounded-full  ${isMicOn ? '!bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'}`}
            >
              {isMicOn ? <Mic size={28} className="text-white" /> : <MicOff size={28} className="text-white" />}
            </button>
          </div>
          
          {/* Camera Button */}
          <div className="w-16 h-16 rounded-full overflow-hidden group">
            <button 
              onClick={toggleCamera} 
              className={`w-16 h-16 flex items-center justify-center transition-all rounded-full  ${isCameraOn ? '!bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'}`}
            >
              {isCameraOn ? <Video size={28} className="text-white" /> : <VideoOff size={28} className="text-white" />}
            </button>
          </div>
          
          {/* End Call Button */}
          <div className="w-16 h-16 rounded-full overflow-hidden group">
            <button 
              onClick={endCall} 
              className="w-16 h-16 flex items-center justify-center !bg-red-600 hover:bg-red-700 text-white transition-all rounded-full border-2 border-transparent group-hover:border-white"
            >
              <Phone size={28} className="text-white transform rotate-135" />
            </button>
          </div>
          
          {/* Captions Button */}
          <div className="w-16 h-16 rounded-full overflow-hidden group">
            <button 
              onClick={toggleCaptions} 
              className={`w-16 h-16 flex items-center justify-center transition-all rounded-full ${isCaptionsOn ? '!bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              <Subtitles size={28} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Call Ended Popup */}
      {showEndCallPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full shadow-2xl border border-gray-700">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-white">Call Ended</h3>
              <button onClick={closePopup} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <p className="text-gray-300 mb-8">Your mock interview session has been completed. Would you like to see your performance analysis?</p>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={closePopup}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={viewAnalysis}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
              >
                <BarChart2 size={20} />
                <span>View Analysis</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockInterviews;