import * as THREE from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as dat from 'dat.gui';

// local from us provided utilities
import * as utils from './lib/utils';
import bunny from './models/bunny.obj';

/*******************************************************************************
 * helper functions to build scene (geometry, light), camera and controls.
 ******************************************************************************/

// enum(s)
export enum Geometries { quad = "Quad", box = "Box", sphere = "Sphere", knot = "Knot", bunny = "Bunny" }
export enum Textures { earth = "Earth", colors = "Colors", disturb = "Disturb", checker = "Checker", terracotta = "Terracotta", plastic = "Plastic", wood_ceiling = "Wood", lava = "Lava", rock = "Rock", indoor = "Enviroment" }
export enum NormalMaps { uniform_normals = "Uniform", terracotta_normals = "Terracotta", plastic_normals = "Plastic", wood_ceiling_normals = "Wood", lava_normals = "Lava", rock_normals = "Rock" }
export enum Shaders { uv = "UV attribute", spherical = "Spherical", fixSpherical = "Spherical (fixed)", envMapping = "Environment Mapping", normalmap = "Normal Map" }


export class Settings extends utils.Callbackable {
  texture: Textures = Textures.earth;
  geometry: Geometries = Geometries.quad;
  shader: Shaders = Shaders.uv;
  pen: () => void = () => { };
  enviroment: boolean = false;
  normalmap: NormalMaps = NormalMaps.uniform_normals;
}

export function createGUI(params: Settings): dat.GUI {
  var gui: dat.GUI = new dat.GUI();

  gui.add(params, 'texture', utils.enumOptions(Textures)).name('Texture')
  gui.add(params, 'geometry', utils.enumOptions(Geometries)).name('Geometry')
  gui.add(params, 'shader', utils.enumOptions(Shaders)).name('Shader')
  gui.add(params, 'normalmap', utils.enumOptions(NormalMaps)).name('Normal Map')
  gui.add(params, "pen").name("Clear Drawing")
  gui.add(params, "enviroment").name("Enviroment")

  return gui;
}

export function createBunny() {
  const loader = new OBJLoader();
  var geometry = new THREE.BufferGeometry();
  var mesh = loader.parse(bunny).children[0];
  if (mesh instanceof THREE.Mesh) {
    geometry = mesh.geometry as THREE.BufferGeometry;
  }
  geometry.setIndex([...Array(geometry.attributes.position.count).keys()]);
  return geometry;
}

export function createBox() {
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  return geometry;
}

export function createSphere() {
  var geometry = new THREE.SphereGeometry(0.6, 30, 30);
  return geometry;
}

export function createKnot() {
  var geometry = new THREE.TorusKnotGeometry(0.4, 0.1, 100, 32);
  return geometry;
}

// export function createQuad() {
//   // var geometry = new THREE.PlaneBufferGeometry(2, 2);
//   const geometry = new THREE.BufferGeometry();

//   const indices = [];

//   const vertices = [];
//   const normals = [];
//   const colors = [];
//   const uv = [];

//   const size = 2;
//   const segments = 100;

//   const halfSize = size / 2;
//   const segmentSize = size / segments;

//   for ( let i = 0; i <= segments; i ++ ) {

//     const y = ( i * segmentSize ) - halfSize;

//     for ( let j = 0; j <= segments; j ++ ) {

//       const x = ( j * segmentSize ) - halfSize;

//       vertices.push( x, - y, 0 );
//       normals.push( 0, 0, 1 );
//       uv.push(j * segmentSize/2, (segments - i) * segmentSize/2);

//       const r = ( x / size ) + 0.5;
//       const g = ( y / size ) + 0.5;

//       colors.push( r, g, 1 );

//     }

//   }

//   // generate indices (data for element array buffer)

//   for ( let i = 0; i < segments; i ++ ) {

//     for ( let j = 0; j < segments; j ++ ) {

//       const a = i * ( segments + 1 ) + ( j + 1 );
//       const b = i * ( segments + 1 ) + j;
//       const c = ( i + 1 ) * ( segments + 1 ) + j;
//       const d = ( i + 1 ) * ( segments + 1 ) + ( j + 1 );

//       // generate two faces (triangles) per iteration

//       indices.push( a, b, d ); // face one
//       indices.push( b, c, d ); // face two

//     }

//   }

//   //

//   geometry.setIndex( indices );
//   geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
//   geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
//   geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
//   geometry.setAttribute( 'uv', new THREE.Float32BufferAttribute( uv, 2 ) );
//   return geometry;
// }



// define camera that looks into scene
export function setupCamera(camera: THREE.PerspectiveCamera, scene: THREE.Scene) {
  // https://threejs.org/docs/#api/cameras/PerspectiveCamera
  camera.near = 0.01;
  camera.far = 1000;
  camera.fov = 70;
  camera.position.z = 2;
  camera.lookAt(scene.position);
  camera.updateProjectionMatrix()
  return camera
}

// define controls (mouse interaction with the renderer)
export function setupControls(controls: OrbitControls) {
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.enableZoom = true;
  controls.keys = { LEFT: '65', UP: '87', RIGHT: '68', BOTTOM: '83' };
  controls.minDistance = 0.1;
  controls.maxDistance = 9;
  return controls;
};
