import * as faceapi from 'face-api.js';

// Function to load models before inference
const loadModels = async () => {
  const MODEL_URL = '/models'; // Modify to your correct model path
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    faceapi.nets.tinyYolov2.loadFromUri(MODEL_URL), // Ensure TinyYolov2 is loaded
  ]);
};

export { loadModels };

