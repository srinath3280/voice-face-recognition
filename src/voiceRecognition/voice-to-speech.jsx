import React, { useState } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function VoiceRecognition() {
  const [Text, setText] = useState('');
  const [lang, setLang] = useState('en-US');

  recognition.lang = lang;

  const handleLanguageChange = e => {
    setLang(e.target.value);
  };

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    // const splitTranscript = transcript.split(" ");
    // console.log(splitTranscript)
    setText(transcript);

    // const paragraphText = 'English is a very popular language that is spoken all around the world';
    // const splitText = paragraphText.split(" ");

    // splitText.forEach(str => {
    //   // Check if the element exists in the second array
    //   if (splitTranscript.includes(str)) {
    //     // If it does, push it to the commonStrings array
    //     setColor("green")
    //   }
    //   else{
    //     setColor("red")
    //   }
    // });
  };

  const startListening = () => {
    recognition.start();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Speak Words</h1>
      <select value={lang} onChange={handleLanguageChange}>
        <option value='en-US'>English</option>
        <option value='te-IN'>Telugu</option>
        <option value='hi-IN'>Hindi</option>
      </select>
      <button onClick={startListening}>Start</button>
      <div>
        <h4>English Sentence: These skills will allow you to read English language newspapers.</h4>
        <h4>Telugu sentence: దయచేసి నన్ను (ఈ చిరునామా)కి తీసుకెళ్లండి.</h4>
        <h4>Hindi Sentence: मैं अच्छी तरह से हिंदी नहीं बोलता</h4>
        <p>Text: {Text}</p>
      </div>
    </div>
  );
}

export default VoiceRecognition;









// // // import './App.css';
// // // import React, { useState } from 'react';
// // // import SpeechRecognition,{ useSpeechRecognition } from 'react-speech-recognition';

// // // function App() {
// // //   const{
// // //     transcript,
// // //     listening,
// // //     resetTranscript,
// // //     browserSupportsSpeechRecognition
// // //   } = useSpeechRecognition();

// // //   const [language,setLanguage]= useState(null);
// // //   if(!browserSupportsSpeechRecognition){
// // //     return <span>Browser doesn't support speech to text</span>
// // //   }

// // //   const handleLanguageChange = (event) => {
// // //     setLanguage(event.target.value);
// // //   };

// // //   return (
// // //     <div className="App">
// // //       <p>Microphone: {listening ? 'on' : 'off'}</p>
// // //       <p>Text can you speak</p>
// // //       <select value={language} onChange={handleLanguageChange}>
// // //         <option value="en-US">English (United State)</option>
// // //         <option value="en-te">Telugu</option>
// // //         <option value="en-hi">Hindi</option>
// // //       </select>
// // //       <button onClick={SpeechRecognition.startListening}>Start</button>
// // //       <button onClick={SpeechRecognition.stopListening}>Stop</button>
// // //       <button onClick={resetTranscript}>Reset</button>
// // //       <p>{transcript}</p>
// // //     </div>
// // //   );
// // // }

// // // export default App;
