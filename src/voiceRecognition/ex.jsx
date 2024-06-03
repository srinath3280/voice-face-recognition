// import React, { useState } from 'react';

// const VoiceAndWordRecognition = () => {
//   const [transcript, setTranscript] = useState('');
  
//   const startRecognition = () => {
//     if (!('webkitSpeechRecognition' in window)) {
//       alert('Speech recognition is not supported in this browser. Please use a supported browser.');
//       return;
//     }

//     const recognition = new window.webkitSpeechRecognition();
//     recognition.lang = 'te-IN'; // Set language to Telugu

//     recognition.onresult = (event) => {
//       const speechToText = event.results[0][0].transcript;
//       setTranscript(speechToText);
//     };

//     recognition.onerror = (event) => {
//       console.error('Speech recognition error:', event.error);
//     };

//     recognition.start();
//   };

//   return (
//     <div>
//       <h1>Telugu Speech to Text</h1>
//       <button onClick={startRecognition}>Start Listening</button>
//       <div>{transcript}</div>
//     </div>
//   );
// };

// export default VoiceAndWordRecognition;






import React, { useState } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function VoiceAndWordRecognition() {
  const [Text, setText] = useState('');
  const [lang, setLang] = useState('en-US');
  const [highlightedText, setHighlightedText] = useState('');

  recognition.lang = lang;

  const handleLanguageChange = e => {
    setLang(e.target.value);
  };

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    setText(transcript);

    // Text to compare
    const englishText = 'These skills will allow you to read English language newspapers.';

    // Splitting texts
    const inputWords = transcript.split(' ');
    const correctWords = englishText.split(' ');

    // Highlighting logic
    const highlighted = inputWords.map((word, index) => {
      if (correctWords[index] === word) {
        return <span key={index} style={{ color: 'green' }}>{word}</span>;
      } else {
        return <span key={index} style={{ color: 'red' }}>{word}</span>;
      }
    });

    setHighlightedText(highlighted);
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
        <p>Text: {highlightedText}</p>
      </div>
    </div>
  );
}

export default VoiceAndWordRecognition;
