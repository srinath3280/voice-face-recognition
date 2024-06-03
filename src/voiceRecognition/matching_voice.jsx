import React, { useState } from 'react';
import { recordAudio, compareAudio } from './audioUtils'; // Assume you have utilities for audio recording and comparison

function VoiceMatcher() {
  const [recording1, setRecording1] = useState(null);
  const [recording2, setRecording2] = useState(null);
  const [matchingPercentage, setMatchingPercentage] = useState(null);
  const [matched, setMatched] = useState(false);
  const threshold = 80;

  const handleRecord = async (index) => {
    const recording = await recordAudio(); // Function to start recording audio
    if (index === 1) {
      setRecording1(recording);
    } else {
      setRecording2(recording);
    }
  };

  const handleCompare = async () => {
    if (recording1 && recording2) {
      const percentage = await compareAudio(recording1, recording2); // Function to compare audio recordings
      setMatchingPercentage(percentage);
      setMatched(percentage >= threshold); // Set a threshold for matching
    }
  };

  return (
    <div>
      <button onClick={() => handleRecord(1)}>Record Voice 1</button>
      <button onClick={() => handleRecord(2)}>Record Voice 2</button>
      <button onClick={handleCompare}>Compare</button>
      {matchingPercentage && (
        <p>Matching Percentage: {matchingPercentage}%</p>
      )}
      {matched !== null && (
        <p>Voice {matched ? 'matched' : 'not matched'}</p>
      )}
    </div>
  );
}

export default VoiceMatcher;
