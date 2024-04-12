import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const ImageCapture = () => {
    const webcamRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const imageSrc1 = webcamRef.current.getScreenshot();
            setImageSrc(imageSrc1);
        }, 5000);
        return () => clearInterval(interval);
    }, [])

    // Send image data to backend
    axios.post('http://localhost:3800/image', { image: imageSrc })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });

    //   const capture = () => {
    //     const imageSrc1 = webcamRef.current.getScreenshot();
    //     setImageSrc(imageSrc1)
    //     // Send image data to backend
    //     axios.post('http://localhost:3800/image', { image: imageSrc1 })
    //       .then(response => {
    //         console.log(response.data);
    //       })
    //       .catch(error => {
    //         console.error('Error uploading image:', error);
    //       });
    //   };

    return (
        <>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            {/* <button onClick={capture}>Capture</button> */}
            {imageSrc && <img src={imageSrc} alt="Captured Selfie" width='300px' height='300px' />}
        </>
    );
};

export default ImageCapture;







// import axios from 'axios';
// import React, { useState, useRef } from 'react';
// import Webcam from 'react-webcam';

// const App = () => {
//   const webcamRef = useRef(null);
//   const [imageSrc, setImageSrc] = useState(null);

//   const capture = () => {
//     const imageSrc1 = webcamRef.current.getScreenshot();
//     setImageSrc(imageSrc1);
//     axios({
//       method:'post',
//       url:'http://localhost:3800/image',
//       data:imageSrc1
//     })
//   };

//   return (
//     <>
//         <Webcam
//           audio={false}
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           name='SRC'
//           style={{ width: '400px', height: '400px' }}
//         />
//         <button onClick={capture}>Capture photo</button>
//       {imageSrc && <img src={imageSrc} alt="Captured Selfie" width='300px' height='300px' />}
//     </>
//   );
// };

// export default App;
