import React, { useState, useRef } from 'react';

const DummyVoice = () => {
  const [firstRecording, setFirstRecording] = useState(null);
  const [secondRecording, setSecondRecording] = useState(null);
  const [matchingPercentage, setMatchingPercentage] = useState(null);

  const firstAudioRef = useRef(null);
  const secondAudioRef = useRef(null);

  const startRecording = async (index) => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/wav' });
      if (index === 1) {
        setFirstRecording(blob);
      } else {
        setSecondRecording(blob);
      }
    };

    mediaRecorder.start();
    setTimeout(() => {
      mediaRecorder.stop();
    }, 5000); // Recording for 5 seconds, adjust as needed
  };

  const playRecording = (index) => {
    if (index === 1 && firstRecording) {
      firstAudioRef.current.src = URL.createObjectURL(firstRecording);
      firstAudioRef.current.play();
    } else if (index === 2 && secondRecording) {
      secondAudioRef.current.src = URL.createObjectURL(secondRecording);
      secondAudioRef.current.play();
    }
  };

  const stopRecording = () => {
    // Stop playback if in progress
    firstAudioRef.current.pause();
    secondAudioRef.current.pause();
  };

  const compareRecordings = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const reader = new FileReader();

    reader.onload = (event) => {
      audioContext.decodeAudioData(event.target.result, (buffer) => {
        const source1 = audioContext.createBufferSource();
        source1.buffer = buffer;
        source1.connect(audioContext.destination);
        source1.start();

        const source2 = audioContext.createBufferSource();
        source2.buffer = buffer;
        source2.connect(audioContext.destination);
        source2.start();

        const analyser = audioContext.createAnalyser();
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        analyser.getByteTimeDomainData(dataArray);
        const rms1 = Math.sqrt(
          Array.from(dataArray).reduce((acc, val) => acc + Math.pow(val - 128, 2), 0) / bufferLength
        );

        analyser.getByteTimeDomainData(dataArray);
        const rms2 = Math.sqrt(
          Array.from(dataArray).reduce((acc, val) => acc + Math.pow(val - 128, 2), 0) / bufferLength
        );

        const matchingPercentage = Math.abs(rms1 - rms2) / 128 * 100;
        setMatchingPercentage(100 - matchingPercentage);
      });
    };

    reader.readAsArrayBuffer(secondRecording);
  };

  return (
    <div>
      <button onClick={() => startRecording(1)}>Start Recording 1</button>
      <button onClick={() => startRecording(2)}>Start Recording 2</button>
      <button onClick={() => playRecording(1)}>Play Recording 1</button>
      <button onClick={() => playRecording(2)}>Play Recording 2</button>
      <button onClick={stopRecording}>Stop</button>
      <button onClick={compareRecordings}>Compare</button>

      <audio ref={firstAudioRef} controls />
      <audio ref={secondAudioRef} controls />
      
      {matchingPercentage && (
        <div>
          Matching Percentage: {matchingPercentage.toFixed(2)}%
        </div>
      )}
    </div>
  );
};

export default DummyVoice;
