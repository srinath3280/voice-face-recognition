import React, { useState, useEffect, useRef } from 'react';

const SpeechRecognitionCombined = () => {
    const [spokenWords, setSpokenWords] = useState([]);
    const [recognizedWords, setRecognizedWords] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en-US');
    const predefinedTexts = {
        'en-US': "these skills will allow you to read english language newspapers.",
        'te-IN': "దయచేసి నన్ను ఈ చిరునామాకి తీసుకెళ్లండి.",
        'hi-IN': "मैं अच्छी तरह से हिंदी नहीं बोलता।"
    };
    const splitText = Object.values(predefinedTexts).map(text => text.split(" ")).flat();
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

            setSpokenWords(transcript.split(' '));
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
        const newRecognizedWords = spokenWords.map((word) => {
            if (splitText.includes(word.toLowerCase())) {
                return { word: word, color: 'green' };
            } else {
                return { word: word, color: 'red' };
            }
        });

        // Check if newRecognizedWords is different from recognizedWords before updating
        if (JSON.stringify(newRecognizedWords) !== JSON.stringify(recognizedWords)) {
            setRecognizedWords(newRecognizedWords);
        }
    }, [spokenWords, splitText, recognizedWords]);

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
                <p>Spoken Words:</p>
                {spokenWords.map((word, index) => (
                    <span key={index}>{word}&nbsp;</span>
                ))}
            </div>
            <div>
                <p>Recognized Words:</p>
                {recognizedWords.map(({ word, color }, index) => (
                    <span key={index} style={{ color: color }}>{word}&nbsp;</span>
                ))}
            </div>
        </div>
    );
};

export default SpeechRecognitionCombined;









// import React, { useState, useEffect, useRef } from 'react';

// const SpeechRecognitionCombined = () => {
//     const [spokenWords, setSpokenWords] = useState([]);
//     const [recognizedWords, setRecognizedWords] = useState([]);
//     const [isListening, setIsListening] = useState(false);
//     const [selectedLanguage, setSelectedLanguage] = useState('en-US');
//     const predefinedTexts = {
//         'en-US': "these skills will allow you to read english language newspapers.",
//         'te-IN': "దయచేసి నన్ను ఈ చిరునామాకి తీసుకెళ్లండి.",
//         'hi-IN': "मैं अच्छी तरह से हिंदी नहीं बोलता।"
//     };
//     const splitText = Object.values(predefinedTexts).map(text => text.split(" ")).flat();
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

//             setSpokenWords(transcript.split(' '));
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
//         const newRecognizedWords = spokenWords.map((word) => {
//             if (splitText.includes(word.toLowerCase())) {
//                 return <span style={{ color: 'green' }}>{word}&nbsp;</span>;
//             }
//             else {
//                 return <span style={{ color: 'red' }}>{word}&nbsp;</span>;
//             }
//         });
//         setRecognizedWords(newRecognizedWords);
//     }, [spokenWords, splitText]);

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
//                 <p>Spoken Words:</p>
//                 {spokenWords.map((word, index) => (
//                     <span key={index}>{word}&nbsp;</span>
//                 ))}
//             </div>
//             <div>
//                 <p>Recognized Words:</p>
//                 {recognizedWords}
//             </div>
//         </div>
//     );
// };

// export default SpeechRecognitionCombined;
