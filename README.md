# Texture Mapping with Three.js

This demo showcases texture mapping using WebGL and Three.js. It provides various shaders, geometries, and textures to experiment with different combinations. Users are also able to paint their custom texture and observe real-time changes in the 3D texture. Additionally, you can view the 🌟 [demo](https://kilinmao.github.io/texture). 🌟 

## Features
* Multiple shaders such as UV attribute, Spherical, Fixed Spherical, Environment Mapping, and Normal Mapping
* Different geometries: Quad, Box, Sphere, Knot, and Bunny
* Various textures, including Earth, Colors, Disturb, Checker, Terracotta, Plastic, Wood, Lava, Rock, and Indoor
* Option to enable environment mapping
* Selection of normal maps
* A custom drawing panel for creating your own textures in the canvas
* Orbit camera controls for easy navigation in 3D space

## Usage
1. Run the demo and use the dat.GUI interface to select and experiment with different combinations of shaders, geometries, and textures.
2. You can enable environment mapping to enhance the realism of the textures.
3. Select a normal map to add fine details to the texture surface.
4. Paint custom textures using the drawing panel in the left pane. The texture painting process is interactive and updates instantly on the 3D geometry.
5. Use orbit controls to navigate the 3D scene and inspect the textures up close.

## Main Functionality
The demo sets up a scene with a mesh, initializes a renderer, and provides an orbit camera. Users can manipulate shader materials, geometry, and textures through the settings to experiment with different texture mapping techniques. The demo also allows users to paint custom textures which can be instantly rendered on the 3D geometry.

## Libs & Helpers
The project uses the following libraries and helper functions:

* Three.js for rendering 3D shapes and textures using WebGL.
* OrbitControls for smooth camera navigation with mouse or touch support.
* dat.GUI for providing an intuitive user interface to manipulate shaders, geometry, and textures.
* ImageWidget for drawing custom textures and enabling texture painting on the canvas.

### Helper files
- `helper.ts`: Set up a camera, controls, and various geometry shapes.
- `settings.ts`: Handles all settings changes, such as textures, geometries, and shaders.