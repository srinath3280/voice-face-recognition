import React, { useState, useEffect, useRef } from 'react';

const SpeechRecognitionWord = () => {
    const [spokenWord, setSpokenWord] = useState('');
    const [recognizedWord, setRecognizedWord] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en-US');
    const predefinedTexts = {
        'en-US': "newspapers.",
        'te-IN': "దయచేసి.",
        'hi-IN': "बोलता।"
    };
    const recognitionRef = useRef(null);

    useEffect(() => {
        recognitionRef.current = new window.webkitSpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onstart = () => {
            setIsListening(true);
        };

        recognitionRef.current.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };

        recognitionRef.current.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join('');

            setSpokenWord(transcript.split(' ')[0]);
        };

        return () => {
            recognitionRef.current.stop();
        };
    }, []);

    useEffect(() => {
        if (recognitionRef.current) {
            recognitionRef.current.lang = selectedLanguage;
        }
    }, [selectedLanguage]);

    useEffect(() => {
        const recognizedChars = spokenWord.split('').map((char, index) => {
            const wordChar = char.toLowerCase();
            const predefinedChar = predefinedTexts[selectedLanguage][index].toLowerCase() || predefinedTexts[selectedLanguage][index] || predefinedTexts[selectedLanguage][index].toUpperCase();
            const color = wordChar === predefinedChar ? 'green' : 'red';
            return <span key={index} style={{ color }}>{char}&nbsp;</span>;
        });
        setRecognizedWord(recognizedChars);
    }, [spokenWord, selectedLanguage]);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
        setIsListening(!isListening);
    };

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
    };

    return (
        <div>
            <h1>Speech Recognition</h1>
            <select onChange={handleLanguageChange} value={selectedLanguage}>
                <option value='en-US'>English</option>
                <option value='te-IN'>Telugu</option>
                <option value='hi-IN'>Hindi</option>
            </select>
            <button onClick={toggleListening}>
                {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
            <div>
                <p>Predefined Text:</p>
                {Object.entries(predefinedTexts).map(([key, value]) => (
                    <div key={key}>
                        <p>{key}: {value}</p>
                    </div>
                ))}
            </div>
            <div>
                <p>Spoken Word:</p>
                <span>{spokenWord}</span>
            </div>
            <div>
                <p>Recognized Word:</p>
                {recognizedWord}
            </div>
        </div>
    );
};

export default SpeechRecognitionWord;







// import React, { useState, useEffect, useRef } from 'react';

// const SpeechRecognitionWord = () => {
//     const [spokenCharacter, setSpokenCharacter] = useState('');
//     const [recognizedCharacter, setRecognizedCharacter] = useState(null);
//     const [isListening, setIsListening] = useState(false);
//     const [selectedLanguage, setSelectedLanguage] = useState('en-US');
//     const predefinedTexts = {
//         'en-US': "newspapers.",
//         'te-IN': "దయచేసి.",
//         'hi-IN': "बोलता।"
//     };
//     const splitText = Object.values(predefinedTexts).map(text => text.replace(/\s/g, '')).join('');
//     const recognitionRef = useRef(null);

//     useEffect(() => {
//         recognitionRef.current = new window.webkitSpeechRecognition();
//         recognitionRef.current.continuous = true;
//         recognitionRef.current.interimResults = true;

//         recognitionRef.current.onstart = () => {
//             setIsListening(true);
//         };

//         recognitionRef.current.onerror = (event) => {
//             console.error('Speech recognition error:', event.error);
//             setIsListening(false);
//         };

//         recognitionRef.current.onend = () => {
//             setIsListening(false);
//         };

//         recognitionRef.current.onresult = (event) => {
//             const transcript = Array.from(event.results)
//                 .map((result) => result[0])
//                 .map((result) => result.transcript)
//                 .join('');

//             setSpokenCharacter(transcript);
//         };

//         return () => {
//             recognitionRef.current.stop();
//         };
//     }, []);

//     useEffect(() => {
//         if (recognitionRef.current) {
//             recognitionRef.current.lang = selectedLanguage;
//         }
//     }, [selectedLanguage]);

//     useEffect(() => {
//         if (spokenCharacter !== '') {
//             const index = splitText.indexOf(spokenCharacter.toLowerCase());
//             if (index !== -1) {
//                 const char = splitText.charAt(index);
//                 setRecognizedCharacter(char);
//                 // Speak the character here
//                 // You can use text-to-speech libraries like SpeechSynthesis to speak the character
//             } else {
//                 setRecognizedCharacter(null);
//             }
//         }
//     }, [spokenCharacter, splitText]);

//     const toggleListening = () => {
//         if (isListening) {
//             recognitionRef.current.stop();
//         } else {
//             recognitionRef.current.start();
//         }
//         setIsListening(!isListening);
//     };

//     const handleLanguageChange = (e) => {
//         setSelectedLanguage(e.target.value);
//     };

//     return (
//         <div>
//             <h1>Speech Recognition</h1>
//             <select onChange={handleLanguageChange} value={selectedLanguage}>
//                 <option value='en-US'>English</option>
//                 <option value='te-IN'>Telugu</option>
//                 <option value='hi-IN'>Hindi</option>
//             </select>
//             <button onClick={toggleListening}>
//                 {isListening ? 'Stop Listening' : 'Start Listening'}
//             </button>
//             <div>
//                 <p>Predefined Text:</p>
//                 {Object.entries(predefinedTexts).map(([key, value]) => (
//                     <div key={key}>
//                         <p>{key}: {value}</p>
//                     </div>
//                 ))}
//             </div>
//             <div>
//                 <p>Spoken Character:</p>
//                 <span>{spokenCharacter}&nbsp;</span>
//             </div>
//             <div>
//                 <p>Recognized Character:</p>
//                 {recognizedCharacter !== null ? <span style={{ color: 'green' }}>{recognizedCharacter}&nbsp;</span> : <span style={{ color: 'red' }}>Not recognized</span>}
//             </div>
//         </div>
//     );
// };

// export default SpeechRecognitionWord;





// import React, { useState, useEffect, useRef } from 'react';

// const SpeechRecognitionWord = () => {
//     const [recognizedWord, setRecognizedWord] = useState('');
//     const [isListening, setIsListening] = useState(false);
//     const [selectedLanguage, setSelectedLanguage] = useState('en-US');
//     const predefinedTexts = {
//         'en-US': "newspapers",
//         'te-IN': "దయచేసి",
//         'hi-IN': "बोलता"
//     };
//     const recognitionRef = useRef(null);

//     useEffect(() => {
//         recognitionRef.current = new window.webkitSpeechRecognition();
//         recognitionRef.current.continuous = true;
//         recognitionRef.current.interimResults = true;

//         recognitionRef.current.onstart = () => {
//             setIsListening(true);
//         };

//         recognitionRef.current.onerror = (event) => {
//             console.error('Speech recognition error:', event.error);
//             setIsListening(false);
//         };

//         recognitionRef.current.onend = () => {
//             setIsListening(false);
//         };

//         recognitionRef.current.onresult = (event) => {
//             const transcript = Array.from(event.results)
//                 .map((result) => result[0])
//                 .map((result) => result.transcript)
//                 .join('');

//             setRecognizedWord(transcript.toLowerCase());
//         };

//         return () => {
//             recognitionRef.current.stop();
//         };
//     }, []);

//     useEffect(() => {
//         if (recognitionRef.current) {
//             recognitionRef.current.lang = selectedLanguage;
//         }
//     }, [selectedLanguage]);

//     useEffect(() => {
//         if (recognizedWord) {
//             // Speak each character of the recognized word
//             recognizedWord.split('').forEach((char) => {
//                 const utterance = new SpeechSynthesisUtterance(char);
//                 window.speechSynthesis.speak(utterance);
//             });
//         }
//     }, [recognizedWord]);

//     const toggleListening = () => {
//         if (isListening) {
//             recognitionRef.current.stop();
//         } else {
//             recognitionRef.current.start();
//         }
//         setIsListening(!isListening);
//     };

//     const handleLanguageChange = (e) => {
//         setSelectedLanguage(e.target.value);
//     };

//     return (
//         <div>
//             <h1>Speech Recognition</h1>
//             <select onChange={handleLanguageChange} value={selectedLanguage}>
//                 <option value='en-US'>English</option>
//                 <option value='te-IN'>Telugu</option>
//                 <option value='hi-IN'>Hindi</option>
//             </select>
//             <button onClick={toggleListening}>
//                 {isListening ? 'Stop Listening' : 'Start Listening'}
//             </button>
//             <div>
//                 <p>Predefined Text:</p>
//                 {Object.entries(predefinedTexts).map(([key, value]) => (
//                     <div key={key}>
//                         <p>{key}: {value}</p>
//                     </div>
//                 ))}
//             </div>
//             <div>
//                 <p>Recognized Word:</p>
//                 <span>{recognizedWord}</span>
//             </div>
//         </div>
//     );
// };

// export default SpeechRecognitionWord;
