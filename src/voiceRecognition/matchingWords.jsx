import React, { useState, useEffect } from 'react';

const SpeechRecognition = () => {
    const [spokenWords, setSpokenWords] = useState([]);
    const [recognizedWords, setRecognizedWords] = useState();
    const [isListening, setIsListening] = useState(false);
    const predefinedWords = "it is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.";
    const splitText = predefinedWords.split(" ");

    useEffect(() => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join('');

            setSpokenWords(transcript.split(' '));
        };

        if (isListening) {
            recognition.start();
        }
        else {
            recognition.stop();
        }

        return () => {
            recognition.stop();
        };
    }, [isListening]);

    useEffect(() => {
        const newRecognizedWords = spokenWords.map((word) => {
            if (splitText.includes(word.toLowerCase())) {
                return <span style={{ color: 'green' }}>{word}&nbsp;</span>;
            }
            else {
                return <span style={{ color: 'red' }}>{word}&nbsp;</span>;
            }
        });
        setRecognizedWords(newRecognizedWords);
    }, [spokenWords, splitText]);

    const toggleListening = () => {
        setIsListening(!isListening);
    };

    return (
        <div>
            <button onClick={toggleListening}>
                {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
            <div>
                <p>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                </p>
            </div>
            <div>
                <p>Spoken Words:</p>
                {spokenWords.map((word, index) => (
                    <span key={index}>{word}&nbsp;</span>
                ))}
            </div>
            <div>
                <p>Recognized Words:</p>
                {recognizedWords}
            </div>
        </div>
    );
};

export default SpeechRecognition;