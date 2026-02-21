# Next-Gen 3D Viewer

## Overview

The Next-Gen 3D Viewer is an innovative application that leverages the power of MediaPipe and Three.js to provide an interactive 3D experience. Users can manipulate 3D models using hand gestures, enabling intuitive controls for scaling, moving, and rotating objects in a virtual space.

## Features

- **Gesture Recognition**: Utilizes MediaPipe for real-time hand tracking and gesture recognition.
- **3D Model Interaction**: Users can interact with 3D models using simple hand gestures:
    - **Double Pinching**: Scale the model.
    - **Pointing**: Move or pan the model.
    - **Pinching**: Rotate the model.
- **Responsive Design**: Optimized for various screen sizes and devices.

## Technologies Used

- **Three.js**: For rendering 3D graphics.
- **MediaPipe**: For hand tracking and gesture recognition.

## Installation

- ```
  npx serve .
  ```

- Open [Local Server](http://localhost:3000)

## Usage

1. Allow camera access when prompted.
2. Use your hands to interact with the 3D model:
    - **Double Pinch**: To scale the model.
    - **Pointing**: To move or pan the model.
    - **Pinch**: To rotate the model.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- [MediaPipe](https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker/web_js) for hand tracking technology.
- [Three.js](https://threejs.org/) for 3D rendering capabilities.
