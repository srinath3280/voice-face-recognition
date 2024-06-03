// audioUtils.js

// Function to record audio using Web Audio API
function recordAudio() {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const mediaRecorder = new MediaRecorder(stream);
          const chunks = [];
  
          mediaRecorder.addEventListener('dataavailable', event => {
            chunks.push(event.data);
          });
  
          mediaRecorder.addEventListener('stop', () => {
            const blob = new Blob(chunks, { type: 'audio/wav' });
            resolve(blob);
          });
  
          mediaRecorder.start();
  
          setTimeout(() => {
            mediaRecorder.stop();
          }, 5000); // Recording for 5 seconds as an example
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  
  // Function to compare two audio files
  function compareAudio(audio1, audio2) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const audioData1 = reader.result;
  
        const reader2 = new FileReader();
        reader2.onload = () => {
          const audioData2 = reader2.result;
  
          // Simple comparison: Check if the lengths of the audio data arrays are equal
          const isEqual = audioData1.byteLength === audioData2.byteLength;
          resolve(isEqual);
        };
        reader2.readAsArrayBuffer(audio2);
      };
  
      reader.readAsArrayBuffer(audio1);
    });
  }
  
  // Exporting functions
  export { recordAudio, compareAudio };
  