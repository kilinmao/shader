# Custom Shader Materials with Three.js

This is an example project showcasing the implementation of custom shader materials with Three.js. It demonstrates using different shaders to render a 3D scene and allows users to switch between various shading techniques with real-time results. Additionally, you can view the 🌟 [demo](https://kilinmao.github.io/shader). 🌟 

## Features

* Custom GLSL shaders integrated with Three.js
* Shader materials include:
  * Ambient shading
  * Normal shading
  * Toon shading
  * Lambert shading
  * Gouraud shading with Phong specular
  * Phong shading with Phong specular
  * Phong shading with Blinn-Phong specular
* Adjustable light position
* Adjustable material properties such as ambient, diffuse, and specular reflectance, as well as shininess
* Interactive controls using dat.GUI
* Orbit camera controls for easy scene navigation

## Usage

1. Set up your 3D scene using the helper functions in the `helper.ts` file or create your own components.
2. Adjust the shader material on the objects in the scene by selecting the desired shader from the dropdown menu.
3. Modify the material properties and light position using the dat.GUI controls to see real-time changes in the rendering.
4. Use OrbitControls to navigate around the scene and observe the shading from different viewpoints.

## Main Functionality

The primary functionalities for setting up the custom shaders and materials can be found in the `main.ts` file. The various shader materials are created using the Three.js `ShaderMaterial` class, and their properties are controlled by the user-defined settings. Upon changing the shader settings, the scene is updated to reflect the changes, allowing real-time comparisons between different shading techniques.

## Libs & Helpers

The project uses the following libraries and helper functions:

* Three.js for WebGL rendering and 3D scene setup
* dat.GUI for controlling settings and adjustments
* OrbitControls for camera navigation
* Utility functions for window and application handling in `./lib/utils.ts`
* Helper functions for geometry setup, camera positioning, and controls in `./helper.ts`

## Shaders

The custom GLSL shaders are loaded using webpack and can be found in the `./shader` directory. Each shader is broken down into a vertex and fragment shader file, with corresponding `.v.glsl` and `.f.glsl` file extensions.

The shaders include:

* `ambient`: Basic ambient shading
* `normal`: Displays normal vectors as RGB colors
* `toon`: Simple toon/cel shading
* `lambert`: Lambertian diffuse shading
* `gouraud`: Gouraud shading with Phong specular highlights
* `phong`: Phong shading with Phong specular highlights
* `blinnPhong`: Phong shading with Blinn-Phong specular highlights

To add new shader materials, simply create a new vertex and fragment shader file in the `./shader` directory and integrate them into the `main.ts` file following the same pattern as the other shader materials. Update the `Shaders` enum and the shader switch cases accordingly to handle the new shading material.