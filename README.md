# 3d-Viewer Using Hand Generations

The Next-Gen 3D Viewer is an innovative application that leverages the power of MediaPipe and Three.js to provide an interactive 3D experience. Users can manipulate 3D models using hand gestures, enabling intuitive controls for scaling, moving, and rotating objects in a virtual space.

## Technologies

This project utilizes the following technologies:

- **Three.js** - 3D graphics library for WebGL rendering
- **MediaPiper** - Hands and Finger LandMark Detection
- **JavaScript** - Core programming language
- **HTML5/CSS3** - Frontend markup and styling
- **Electron** - Desktop Application
- **Electron-Builder** - Build Electron app

## Installation

### Prequesties - Nodejs

- go to the directory after cloning repository
- then install node modules

    ```
    npm install
    ```

- run in following modes
    - **Development**

        ```
        npm start
        ```

    - **Build**

        ```
        npm run build
        ```

        - Now go to dist folder and see built executables

## Usage

1. Allow camera access when prompted.
2. Use your hands to interact with the 3D model:
    - **Double Pinch**: To scale the model.
    - **Pointing**: To move or pan the model.
    - **Pinch**: To rotate the model.
3. Use your Own Glb by droping on the window

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- [MediaPipe](https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker/web_js) for hand tracking technology.
- [Three.js](https://threejs.org/) for 3D rendering capabilities.
