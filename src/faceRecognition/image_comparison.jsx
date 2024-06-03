import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

// Utility function to convert base64 data to a binary format
const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  
  return new Blob([uint8Array], { type: mimeString });
};

const ImageCaptureMatching = () => {
  const webcamRef = useRef(null);
  const [webcamImage, setWebcamImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagesMatch, setImagesMatch] = useState(null);

  const captureWebcamImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setWebcamImage(imageSrc);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const compareImages = () => {
    if (webcamImage && uploadedImage) {
      // Convert base64 data to Blob to ensure fair comparison
      const webcamBlob = dataURItoBlob(webcamImage);
      const uploadedBlob = dataURItoBlob(uploadedImage);

      const webcamArrayBufferPromise = webcamBlob.arrayBuffer();
      const uploadedArrayBufferPromise = uploadedBlob.arrayBuffer();

      Promise.all([webcamArrayBufferPromise, uploadedArrayBufferPromise])
        .then(([webcamBuffer, uploadedBuffer]) => {
          // Compare ArrayBuffers
          if (webcamBuffer.byteLength !== uploadedBuffer.byteLength) {
            setImagesMatch(false);
            return;
          }

          const webcamArray = new Uint8Array(webcamBuffer);
          const uploadedArray = new Uint8Array(uploadedBuffer);

          const areEqual = webcamArray.every((val, index) => val === uploadedArray[index]);

          setImagesMatch(areEqual);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
      />
      <button onClick={captureWebcamImage}>Capture Webcam Image</button>

      {webcamImage && (
        <div>
          <img src={webcamImage} alt="Webcam Capture" width={320} height={240} />
        </div>
      )}

      <div>
        <input type="file" onChange={handleFileChange} />
      </div>

      {uploadedImage && (
        <div>
          <img src={uploadedImage} alt="Uploaded" width={320} height={240} />
        </div>
      )}

      <button onClick={compareImages}>Compare Images</button>

      {imagesMatch !== null && (
        <div>
          <h2>Images Match: {imagesMatch ? 'Yes' : 'No'}</h2>
        </div>
      )}
    </div>
  );
};

export default ImageCaptureMatching;
