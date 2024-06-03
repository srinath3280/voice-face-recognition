import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import VoiceRecognition from './voiceRecognition/voice-to-speech';
import ImageCapture from './faceRecognition/image-capture';
import Login from './authenticate/login';
import Register from './authenticate/register';
import SpeechRecognition from './voiceRecognition/matchingWords';
import VoiceAndWordRecognition from './voiceRecognition/ex';
import SpeechRecognitionCombined from './voiceRecognition/ex1';
import SpeechRecognitionWord from './voiceRecognition/ex2';
import VoiceMatcher from './voiceRecognition/matching_voice';
import DummyVoice from './voiceRecognition/dummyvoice';
import ImageCaptureMatching from './faceRecognition/image_comparison';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      },
      {
        path:'/VoiceAndWordRecognition',
        element:<VoiceAndWordRecognition></VoiceAndWordRecognition>
      },
      {
        path:'/speechtotext',
        element:<VoiceRecognition></VoiceRecognition>
      },
      {
        path:'/voicerecognition',
        element:<SpeechRecognition></SpeechRecognition>
      },
      {
        path:'/imagecapture',
        element:<ImageCapture></ImageCapture>
      },
      {
        path:'/SpeechRecognitionCombined',
        element:<SpeechRecognitionCombined></SpeechRecognitionCombined>
      },
      {
        path:'/SpeechRecognitionWord',
        element:<SpeechRecognitionWord></SpeechRecognitionWord>
      },
      {
        path:"/VoiceMatcher",
        element:<VoiceMatcher></VoiceMatcher>
      },
      {
        path:'/DummyVoice',
        element:<DummyVoice></DummyVoice>
      },
      {
        path:'/ImageCaptureMatching',
        element:<ImageCaptureMatching></ImageCaptureMatching>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
