import {Link, Outlet} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Link to='/'>Home</Link><br></br>
      <Link to='/login'>Login</Link><br></br>
      <Link to='/register'>Register</Link><br></br>
      {/* <Link to="/VoiceAndWordRecognition">VoiceAndWordRecognition</Link><br></br> */}
      {/* <Link to='/speechtotext'>Speech to text</Link><br></br> */}
      {/* <Link to='/voicerecognition'>Voice Recognition</Link><br></br> */}
      <Link to='/imagecapture'>Image Capture</Link> <br></br>
      <Link to="/SpeechRecognitionCombined">Speech Recognition By Sentence</Link> <br></br>
      <Link to="/SpeechRecognitionWord">Speech Recognition By Word</Link> <br></br>
      {/* <Link to="/VoiceMatcher">VoiceMatcher</Link> <br></br> */}
      <Link to="/DummyVoice">Voice Matching</Link> <br></br>
      <Link to="/ImageCaptureMatching">Image Capture Matching</Link>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
