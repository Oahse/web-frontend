import { useEffect, useRef, useState } from 'react';
import { convertImageToBase64 } from '@/services/helper';
import user from '@/assets/images/avatar/user-1.png';
import useDeviceType from '@/hooks/useDeviceType'
import Link from '@/components/Button/Link';
const Camera = () => {
    const { isMobile, isTablet, isDesktop } = useDeviceType();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [stream, setStream] = useState(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setIsVideoReady(true);
        };
      }
      setStream(mediaStream);
    } catch (error) {
      alert('Error accessing camera: ' + error.message);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsVideoReady(false);
  };

  useEffect(() => {
    if (cameraActive) {
      startCamera();
    } else {
      stopCamera();
      setImageBase64(null); // Optional: clear last image when camera turned off
    }

    // Cleanup on unmount
    return () => {
      stopCamera();
    };
  }, [cameraActive]);

  const takePicture = async () => {
    if (!videoRef.current || !canvasRef.current || !isVideoReady) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (blob) {
        const base64 = await convertImageToBase64(blob);
        setImageBase64(base64);
      }
    }, 'image/jpeg', 1);
  };

  return (
    <div className="tf-login-form">
      <div>
        { cameraActive?<video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: '100%', marginTop: 10, borderRadius: 8 }}
        />:<div
                className="d-flex justify-content-center align-items-center"
                style={{ width: '100%', height: '100%' }} // Adjust height if needed
                >
                <img
                    src={user}
                    alt="user"
                    style={{ width: '300px', height: '300px', marginTop: 10, borderRadius: 8 }}
                />
                </div>}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        <div className="d-flex align-items-center gap-3 mt-3">
          {imageBase64 && (
            <img
              src={imageBase64}
              alt="Captured"
              style={{ width: '100px', height: 'auto', borderRadius: 4 }}
            />
          )}
            {isMobile?
                <div className='d-flex flex-column justify-content-center align-items-center w-100' style={{ height: '150px' }}>
                    { cameraActive &&<button
                        className="tf-btn btn-fill ms-1"
                        onClick={takePicture}
                        disabled={!isVideoReady || !cameraActive}
                    >
                        Take Picture
                    </button>}
                    <button
                        className="tf-btn btn-fill ms-1 mt-1 mb-2"
                        onClick={() => setCameraActive((prev) => !prev)}
                    >
                        {cameraActive ? 'Turn Off Camera' : 'Turn On Camera'}
                    </button>
                    { imageBase64 && 
                            <Link to='#register' data-bs-toggle="modal" text='Search Image' icon='icon-arrow1-top-left' />}
                </div>
            :
            <div className='d-flex flex-row justify-content-center align-items-center w-100' style={{ height: '150px' }}>
                    { cameraActive &&<button
                        className="tf-btn btn-fill ms-1"
                        onClick={takePicture}
                        disabled={!isVideoReady || !cameraActive}
                    >
                        Take Picture
                    </button>}
                    <button
                        className="tf-btn btn-fill ms-1 mx-2"
                        onClick={() => setCameraActive((prev) => !prev)}
                    >
                        {cameraActive ? 'Turn Off Camera' : 'Turn On Camera'}
                    </button>
                    { imageBase64 && 
                            <Link to='#register' data-bs-toggle="modal" text='Search Image' icon='icon-arrow1-top-left' />}
                </div>
            }
          
        </div>
      </div>
    </div>
  );
};

export default Camera;
