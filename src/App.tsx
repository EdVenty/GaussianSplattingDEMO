// import { useEffect, useState } from 'react';
// import { Viewer } from './components/3DGSViewer'
// import InfoPanel from './components/InfoPanel'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewerPage from './pages/ViewerPage';
import ListPage from './pages/ListPage';

function App() {
  // const [xrSupported, setXrSupported] = useState(false);
  // const [isXR, setIsXR] = useState(false);

  // useEffect(() => {
  //   if(!navigator.xr) {
  //     console.log('WebXR not supported');
  //     setXrSupported(false);
  //     return;
  //   }
  //   else{
  //     setXrSupported(true);
  //   }
  //   navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
  //     if(!supported) {
  //       setXrSupported(false);
  //     }
  //   });
  // }, []);

  // const handleXR = () => {
  //   if (!navigator.xr) {
  //     console.warn('WebXR not supported');
  //     return;
  //   }
  //   if (xrSupported) {
  //     navigator.xr.requestSession('immersive-ar').then((session) => {
  //     setIsXR(true);
  //     session.addEventListener('end', () => {
  //       console.log('AR session ended');
  //       setIsXR(false);
  //     });
  //     session.addEventListener('select', () => {
  //       console.log('AR session selected');
  //     });

  //     const overlay = document.createElement('div');
  //     overlay.style.display = 'none';
  //     document.body.appendChild(overlay);

  //     const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  //     svg.setAttribute('width', '38');
  //     svg.setAttribute('height', '38');
  //     svg.style.position = 'absolute';
  //     svg.style.right = '20px';
  //     svg.style.top = '20px';
  //     svg.addEventListener('click', function () {
  //       session.end();
  //     });
  //     overlay.appendChild(svg);

  //     const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  //     path.setAttribute('d', 'M 12,12 L 28,28 M 28,12 12,28');
  //     path.setAttribute('stroke', '#fff');
  //     path.setAttribute('stroke-width', '2');
  //     svg.appendChild(path);

  //     // session.requestReferenceSpace('local').then((refSpace) => {
  //     //   const xrFrame = (_time: DOMHighResTimeStamp, frame: XRFrame) => {
  //     //     session.requestAnimationFrame(xrFrame);
  //     //     // Add rendering logic here
  //     //   };
  //     //   session.requestAnimationFrame(xrFrame);
  //     // });

  //     // if (!session.domOverlay) {
  //     //   session.domOverlay = { root: overlay };
  //     // }

  //     console.log('AR session started');
  //     }).catch((err) => {
  //     console.error('Failed to start AR session:', err);
  //     });
  //   } else {
  //     console.warn('WebXR not supported');
  //   }
  // };

  console.log(import.meta.env.BASE_URL);

  return (
    // <>
    //   <InfoPanel title="Clock" model="Vintage" file='clock.ksplat' onARButtonClick={handleXR} enableXR={xrSupported} isXR={isXR} />
    //   <Viewer src='clock.ksplat' skyboxSrc='alex.jpg' className='w-full h-full' xr={xrSupported} /> *
    // </>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ListPage />
          }
        />
        <Route
          path="/viewer/:splat"
          element={
            <ViewerPage />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
