// external dependencies
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

// local from us provided global utilities
import * as utils from './lib/utils';
import RenderWidget from './lib/rendererWidget';
import { Application, createWindow } from './lib/window';

// helper lib, provides exercise dependent prewritten Code
import * as helper from './helper';

// load shaders
import ambientVertexShader from './shader/ambient.v.glsl';
import ambientFragmentShader from './shader/ambient.f.glsl';
import normalVertexShader from './shader/normal.v.glsl';
import normalFragmentShader from './shader/normal.f.glsl';
import toonVertexShader from './shader/toon.v.glsl';
import toonFragmentShader from './shader/toon.f.glsl';
import gouraudVertexShader from './shader/gouraud.v.glsl';
import gouraudFragmentShader from './shader/gouraud.f.glsl';
import phongVertexShader from './shader/phong.v.glsl';
import phongFragmentShader from './shader/phong.f.glsl';
import lambertVertexShader from './shader/lambert.v.glsl';
import lambertFragmentShader from './shader/lambert.f.glsl';
import blinnPhongVertexShader from './shader/blinnPhong.v.glsl';
import blinnPhongFragmentShader from './shader/blinnPhong.f.glsl';
import { Vector3 } from 'three';

// export var mesh: THREE.Mesh;
var scene = new THREE.Scene();
var a;
var amColor = new THREE.Vector3(104 / 255, 13 / 255, 13 / 255);
var amReflectance = 0.5;
var diColor = new THREE.Vector3(204 / 255, 25 / 255, 25 / 255);
var diReflectance = 1;
var spColor = new THREE.Vector3(255 / 255, 255 / 255, 255 / 255);
var spReflectance = 1;
var mag = 128;
// const light = new THREE.PointLight(0xff0000, 1, 100);
var light:THREE.Mesh;



function makeAmbientMaterial() {
  scene.traverse(function (child) {
    if (child instanceof THREE.Mesh && child != light) {
      child.material = new THREE.ShaderMaterial({
        uniforms: {
          ambientColor: { value: amColor },
          ambientReflectance: { value: amReflectance }
        },
        vertexShader: ambientVertexShader,
        fragmentShader: ambientFragmentShader
      });
      child.material.needsUpdate = true;
    }
  });
}

function makeNormalMaterial() {
  scene.traverse(function (child) {
    if (child instanceof THREE.Mesh && child != light) {
      child.material = new THREE.ShaderMaterial({
        vertexShader: normalVertexShader,
        fragmentShader: normalFragmentShader,
      });
      child.material.needsUpdate = true;
    }
  });
}

function makeToonMaterial() {
  scene.traverse(function (child) {
    if (child instanceof THREE.Mesh && child != light) {
      child.material = new THREE.ShaderMaterial({
        vertexShader: toonVertexShader,
        fragmentShader: toonFragmentShader
      });
      child.material.needsUpdate = true;
    }
  });
}

function makeLambertMaterial() {
  scene.traverse(function (child) {
    if (child instanceof THREE.Mesh && child != light) {
      child.material = new THREE.ShaderMaterial({
        uniforms: {
          ambientColor: { value: amColor },
          ambientReflectance: { value: amReflectance },
          diffColor: { value: diColor },
          diffReflectance: { value: diReflectance },
          lightPos: { value: new Vector3(light.position.x, light.position.y, light.position.z)},
        },
        vertexShader: lambertVertexShader,
        fragmentShader: lambertFragmentShader
      });
      child.material.needsUpdate = true;
    }
  });
}

function makeGouraudMaterial() {
  scene.traverse(function (child) {
    if (child instanceof THREE.Mesh && child != light) {
      child.material = new THREE.ShaderMaterial({
        uniforms: {
          ambientColor: { value: amColor },
          ambientReflectance: { value: amReflectance },
          diffColor: { value: diColor },
          diffReflectance: { value: diReflectance },
          specColor: { value: spColor },
          specReflectance: { value: spReflectance },
          shininess: { value: mag },
          lightPos: { value: new Vector3(light.position.x, light.position.y, light.position.z)},
        },
        vertexShader: gouraudVertexShader,
        fragmentShader: gouraudFragmentShader
      });
      child.material.needsUpdate = true;
    }
  });
}

function makePhongMaterial() {
  scene.traverse(function (child) {
    if (child instanceof THREE.Mesh && child != light) {
      child.material = new THREE.ShaderMaterial({
        uniforms: {
          ambientColor: { value: amColor },
          ambientReflectance: { value: amReflectance },
          diffColor: { value: diColor },
          diffReflectance: { value: diReflectance },
          specColor: { value: spColor },
          specReflectance: { value: spReflectance },
          shininess: { value: mag },
          lightPos: { value: new Vector3(light.position.x, light.position.y, light.position.z) }
        },
        vertexShader: phongVertexShader,
        fragmentShader: phongFragmentShader
      });
      child.material.needsUpdate = true;
    }
  });
}

function makeBlinnPhongMaterial() {
  scene.traverse(function (child) {
    if (child instanceof THREE.Mesh && child != light) {
      child.material = new THREE.ShaderMaterial({
        uniforms: {
          ambientColor: { value: amColor },
          ambientReflectance: { value: amReflectance },
          diffColor: { value: diColor },
          diffReflectance: { value: diReflectance },
          specColor: { value: spColor },
          specReflectance: { value: spReflectance },
          shininess: { value: mag },
          lightPos: { value: new Vector3(light.position.x, light.position.y, light.position.z) }
        },
        vertexShader: blinnPhongVertexShader,
        fragmentShader: blinnPhongFragmentShader
      });
      child.material.needsUpdate = true;
    }
  });
}
function switchMaterial(){
switch (materialName) {
  case 'ambient':
    makeAmbientMaterial();
    break;
  case 'normal':
    makeNormalMaterial();
    break;
  case 'toon':
    makeToonMaterial();
    break;
  case 'lambert':
    makeLambertMaterial();
    break;
  case 'gouraud_phong':
    makeGouraudMaterial();
    break;
  case 'phong_phong':
    makePhongMaterial();
    break;
  case 'phong_blinnPhong':
    makeBlinnPhongMaterial();
    break;
  default:
    break;
}
}


// enum(s)
enum Shaders {
  ambient = "Ambient",
  normal = "Normal",
  toon = "Toon",
  lambert = "Lambert",
  gouraud_phong = "Gouraud",
  phong_phong = "Phong",
  phong_blinnPhong = "Blinn-Phong",
}

// (default) Settings.
class Settings extends utils.Callbackable {
  // different setting types are possible (e.g. string, enum, number, boolean)
  shader: Shaders = Shaders.ambient
  ambient_reflectance: number = 0.5;
  ambient_color: [number, number, number] = [104, 13, 13];
  diffuse_reflectance: number = 1;
  diffuse_color: [number, number, number] = [204, 25, 25];
  specular_reflectance: number = 1;
  specular_color: [number, number, number] = [255, 255, 255];
  magnitude: number = 128;
  lightX: number = 2;
  lightY: number = 2;
  lightZ: number = 2;
}
var materialName: string;
// create GUI given a Settings object
function createGUI(params: Settings): dat.GUI {
  // we are using dat.GUI (https://github.com/dataarts/dat.gui)
  var gui: dat.GUI = new dat.GUI();

  // build GUI
  gui.add(params, 'shader', utils.enumOptions(Shaders)).name('Shader');


  gui.add(params, 'ambient_reflectance', 0, 1, 0.01).name('Ambient reflec...').listen().onChange(function (e) {
    amReflectance = e;
    switchMaterial()
  });
  gui.addColor(params, 'ambient_color').name('Ambient color').listen().onChange(function (e) {
    amColor = new THREE.Vector3(e[0] / 255, e[1] / 255, e[2] / 255);
    switchMaterial()
  });


  gui.add(params, 'diffuse_reflectance', 0, 1, 0.01).name('Diffuse reflect...').listen().onChange(function (e) {
    diReflectance = e;
    switchMaterial()
  });
  gui.addColor(params, 'diffuse_color').name('Diffuse color').listen().onChange(function (e) {
    diColor = new THREE.Vector3(e[0] / 255, e[1] / 255, e[2] / 255);
    switchMaterial()
  });

  gui.add(params, 'specular_reflectance', 0, 1, 0.01).name('Specular reflec...').listen().onChange(function (e) {
    spReflectance = e;
    switchMaterial()
  });
  gui.addColor(params, 'specular_color').name('Specular color').listen().onChange(function (e) {
    spColor = new THREE.Vector3(e[0] / 255, e[1] / 255, e[2] / 255);
    switchMaterial()
  });

  gui.add(params, 'magnitude', 0, 128, 1).name('Magnitude').listen().onChange(function (e) {
    mag = e;
    switchMaterial()
  });

  var lightFolder = gui.addFolder("Light");
  lightFolder.add(params, 'lightX', -10, 10, 0.5).name('X').listen().onChange(function (e) {
    light.position.setX(e);
    switchMaterial()
  });
  lightFolder.add(params, 'lightY', -10, 10, 0.5).name('Y').listen().onChange(function (e) {
    light.position.setY(e);
    switchMaterial()
  });
  lightFolder.add(params, 'lightZ', -10, 10, 0.5).name('Z').listen().onChange(function (e) {
    light.position.setZ(e);
    switchMaterial()
  });
  lightFolder.open();
  return gui;
}





function callback(changed: utils.KeyValuePair<Settings>) {
  // only model change works for now:
  if (changed.key == "shader") {
    switch (changed.value) {
      case Shaders.ambient:
        materialName = 'ambient';
        makeAmbientMaterial();
        break;

      case Shaders.normal:
        materialName = 'normal';
        makeNormalMaterial();
        break;

      case Shaders.toon:
        materialName = 'toon';
        makeToonMaterial();
        break;

      case Shaders.lambert:
        materialName = 'lambert';
        makeLambertMaterial();
        break;

      case Shaders.gouraud_phong:
        materialName = 'gouraud_phong';
        makeGouraudMaterial();
        break;

      case Shaders.phong_phong:
        materialName = 'phong_phong';
        makePhongMaterial();
        break;

      case Shaders.phong_blinnPhong:
        materialName = 'phong_blinnPhong';
        makeBlinnPhongMaterial();
        break;
    }
  }
}
  
/*******************************************************************************
 * Main entrypoint. Previouly declared functions get managed/called here.
 * Start here with programming.
 ******************************************************************************/

function main() {
  // setup/layout root Application.
  // Its the body HTMLElement with some additional functions.
  var root = Application("Shader");
  // define the (complex) layout, that will be filled later:
  root.setLayout([
    ["renderer", "."],
    [".", "."]
  ]);
  // 1fr means 1 fraction, so 2fr 1fr means
  // the first column has 2/3 width and the second 1/3 width of the application
  root.setLayoutColumns(["1fr", "0fr"]);
  // you can use percentages as well, but (100/3)% is difficult to realize without fr.
  root.setLayoutRows(["100%", "0%"]);

  // ---------------------------------------------------------------------------
  // create Settings
  var settings = new Settings();
  // create GUI using settings
  var gui = createGUI(settings);
  gui.open();



  // ---------------------------------------------------------------------------
  // create window with given id
  // the root layout will ensure that the window is placed right
  var rendererDiv = createWindow("renderer");
  // add it to the root application
  root.appendChild(rendererDiv);

  // create renderer
  var renderer = new THREE.WebGLRenderer({
    antialias: true,  // to enable anti-alias and get smoother output
  });

  // create scene

  // user ./helper.ts for building the scene

  a = helper.setupGeometry(scene);

  var sphere = new THREE.SphereGeometry(0.2, 20, 20);
  var material = new THREE.MeshBasicMaterial({ color: 0xFF8000 });
  light = new THREE.Mesh(sphere, material);
  scene.add(light);
  light.position.setX(2);
  light.position.setY(2);
  light.position.setZ(2);

  // create camera
  var camera = new THREE.PerspectiveCamera();
  // user ./helper.ts for setting up the camera
  helper.setupCamera(camera, scene);

  // create controls
  var controls = new OrbitControls(camera, rendererDiv);
  // user ./helper.ts for setting up the controls
  helper.setupControls(controls);

  // adds the callback that gets called on settings change
  settings.addCallback(callback);
  callback({ key: "shader", value: Shaders.ambient });

  // fill the Window (renderDiv). In RenderWidget happens all the magic.
  // It handles resizes, adds the fps widget and most important defines the main animate loop.
  // You dont need to touch this, but if feel free to overwrite RenderWidget.animate
  var wid = new RenderWidget(rendererDiv, renderer, camera, scene, controls);
  // start the draw loop (this call is async)
  wid.animate();
}

// call main entrypoint
main();


