import React from 'react';
import myImage from './sample.jpg';

function App() {
  return (
    <div
      style={{
        height: '100vh', // Full viewport height
        width: '100vw',  // Full viewport width
        margin: '0',
        padding: '0',
        overflow: 'hidden', // Prevent scrolling
        display: 'flex', // Center the image
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Optional: Background color if the image doesn't fill
      }}
    >
      <img
        src={myImage}
        alt="Full Screen"
        style={{
          maxHeight: '100%', // Scale image to fit within the viewport height
          maxWidth: '100%',  // Scale image to fit within the viewport width
          aspectRatio: '960 / 595', // Maintain the aspect ratio
        }}
      />
    </div>
  );
}

export default App;
