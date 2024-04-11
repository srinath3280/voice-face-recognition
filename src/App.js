import {Link, Outlet} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Link to='/'>Home</Link> <br></br>
      <Link to='/voicerecognition'>Voice Recognition</Link><br></br>
      <Link to='/imagecapture'>Image Capture</Link>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
