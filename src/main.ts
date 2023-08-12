import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

// local from us provided global utilities
import * as utils from './lib/utils';
import RenderWidget from './lib/rendererWidget';
import { Application, createWindow } from './lib/window';

// helper lib, provides exercise dependent prewritten Code
import * as helper from './helper';
import ImageWidget from './imageWidget';

import earthImg from './textures/earth.jpg';
import lavaImg from './textures/lava.jpg';
import lavaNormalsImg from './textures/lava_normals.jpg';
import colorsImg from './textures/colors.jpg';
import disturbImg from './textures/disturb.jpg';
import checkerImg from './textures/checker.jpg';
import terracottaImg from './textures/terracotta.jpg';
import terracottaNormalsImg from './textures/terracotta_normals.jpg';
import plasticImg from './textures/plastic.jpg';
import plasticNormalsImg from './textures/plastic_normals.jpg';
import woodCeilingImg from './textures/wood_ceiling.jpg';
import woodCeilingNormalsImg from './textures/wood_ceiling_normals.jpg';
import rockImg from './textures/rock.jpg';
import rockNormalsImg from './textures/rock_normals.jpg';
import indoorImg from './textures/indoor.jpg';
import uniformNormalsImg from './textures/uniform_normals.jpg';


import envMappingVertexShader from './shaders/envMapping.v.glsl';
import envMappingFragmentShader from './shaders/envMapping.f.glsl';
import fixSphericalVertexShader from './shaders/fixSpherical.v.glsl';
import fixSphericalFragmentShader from './shaders/fixSpherical.f.glsl';
import normalmapVertexShader from './shaders/normalmap.v.glsl';
import normalmapFragmentShader from './shaders/normalmap.f.glsl';
import sphericalVertexShader from './shaders/spherical.v.glsl';
import sphericalFragmentShader from './shaders/spherical.f.glsl';
import uvVertexShader from './shaders/uv.v.glsl';
import uvFragmentShader from './shaders/uv.f.glsl';




var mesh =  new THREE.Mesh();
mesh.geometry = createQuad();
var wid1:any;
var drawingCanvas:HTMLCanvasElement;
var scene:THREE.Scene;
var env:boolean;


const earth = new THREE.TextureLoader().load('textures/earth.jpg');
const lava = new THREE.TextureLoader().load(lavaImg);
const lavaNormals = new THREE.TextureLoader().load(lavaNormalsImg);
const colors = new THREE.TextureLoader().load(colorsImg);
const disturb = new THREE.TextureLoader().load(disturbImg);
const checker = new THREE.TextureLoader().load(checkerImg);
const terracotta = new THREE.TextureLoader().load(terracottaImg);
const terracottaNormals = new THREE.TextureLoader().load(terracottaNormalsImg);
const plastic = new THREE.TextureLoader().load(plasticImg);
const plasticNormals = new THREE.TextureLoader().load(plasticNormalsImg);
const woodCeiling = new THREE.TextureLoader().load(woodCeilingImg);
const woodCeilingNormals = new THREE.TextureLoader().load(woodCeilingNormalsImg);
const rock = new THREE.TextureLoader().load(rockImg);
const rockNormals = new THREE.TextureLoader().load(rockNormalsImg);
const indoor = new THREE.TextureLoader().load(indoorImg);
const uniformNormals = new THREE.TextureLoader().load(uniformNormalsImg);

var myTexture = earth;
var myVertexShader = uvVertexShader;
var myFragmentShader = uvFragmentShader;
var widTexture:THREE.CanvasTexture;
var normalTexture = uniformNormals


function createQuad(){

  const geometry = new THREE.BufferGeometry();

  const vertices = new Float32Array(
  [ -1.0, -1.0, 0.0,
    1.0, -1.0, 0.0,
    1.0, 1.0, 0.0,

    1.0, 1.0, 0.0,
    -1.0, 1.0, 0.0,
    -1.0, -1.0, 0.0
  ]
  )

  const normals = new Float32Array(
    [0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
    ]
    )
  const uv = new Float32Array(
    [0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      1.0, 1.0,
      0.0, 1.0,
      0.0, 0.0,
    ]
    )

    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
    geometry.setAttribute( 'uv', new THREE.Float32BufferAttribute( uv, 2 ) );
    return geometry;

}

function makeMyMaterial() {
  if (env) {
    scene.background = myTexture;
    scene.background.mapping = THREE.EquirectangularReflectionMapping;
  } else {
    scene.background = new THREE.Color(0x000000);
  }
      mesh.material = new THREE.ShaderMaterial({
        uniforms: {
          myTexture:{value: myTexture},
          normalTexture:{value: normalTexture},
          widTexture:{value: widTexture}
        },
        vertexShader: myVertexShader,
        fragmentShader: myFragmentShader
  });
  

      mesh.material.needsUpdate = true;
}




enum Geometries { quad = "Quad", box = "Box", sphere = "Sphere", knot = "Knot", bunny = "Bunny" }
enum Textures { earth = "Earth", colors = "Colors", disturb = "Disturb", checker = "Checker", terracotta = "Terracotta", plastic = "Plastic", wood_ceiling = "Wood", lava = "Lava", rock = "Rock", indoor = "Enviroment" }
enum NormalMaps { uniform_normals = "Uniform", terracotta_normals = "Terracotta", plastic_normals = "Plastic", wood_ceiling_normals = "Wood", lava_normals = "Lava", rock_normals = "Rock" }
enum Shaders { uv = "UV attribute", spherical = "Spherical", fixSpherical = "Spherical (fixed)", envMapping = "Environment Mapping", normalmap = "Normal Map" }


class Settings extends utils.Callbackable {
  texture: Textures = Textures.earth;
  geometry: Geometries = Geometries.quad;
  shader: Shaders = Shaders.uv;
  pen: () => void = () => { };
  enviroment: boolean = false;
  normalmap: NormalMaps = NormalMaps.uniform_normals;
}

function createGUI(params: Settings): dat.GUI {
  var gui: dat.GUI = new dat.GUI();

  gui.add(params, 'texture', utils.enumOptions(Textures)).name('Texture')
  gui.add(params, 'geometry', utils.enumOptions(Geometries)).name('Geometry')
  gui.add(params, 'shader', utils.enumOptions(Shaders)).name('Shader')
  gui.add(params, 'normalmap', utils.enumOptions(NormalMaps)).name('Normal Map')
  gui.add(params, "pen").name("Clear Drawing").listen().onChange(function (e) {
    wid1.clearDrawing();
    drawingCanvas = wid1.getDrawingCanvas()
    widTexture = new THREE.CanvasTexture(drawingCanvas);
    makeMyMaterial()
  });
  gui.add(params, "enviroment").name("Enviroment").listen().onChange(function (e) {
    if (e) {
      env = true;
      makeMyMaterial()
    } else {
      env = false;    
      makeMyMaterial()
  };
})

  return gui;
}



function callback(changed: utils.KeyValuePair<Settings>) {

  if (changed.key == "texture") {
    switch (changed.value) {
      case Textures.earth:
        wid1.setImage(earthImg);
        myTexture = earth;
        makeMyMaterial()
        break;
      case Textures.colors:
        wid1.setImage(colorsImg);
        myTexture = colors;
        makeMyMaterial()
        break;
      case Textures.disturb:
        wid1.setImage(disturbImg);
        myTexture = disturb
        makeMyMaterial()
        break;
      case Textures.checker:
        wid1.setImage(checkerImg);
        myTexture = checker
        makeMyMaterial()
        break;
      case Textures.terracotta:
        wid1.setImage(terracottaImg);
        myTexture = terracotta
        makeMyMaterial()
        break;
      case Textures.plastic:
        wid1.setImage(plasticImg);
        myTexture = plastic
        makeMyMaterial()
        break;
        case Textures.wood_ceiling:
          wid1.setImage(woodCeilingImg);
          myTexture = woodCeiling
          makeMyMaterial()
          break;
      case Textures.lava:
        wid1.setImage(lavaImg);
        myTexture = lava;
        makeMyMaterial()
        break;
      case Textures.rock:
        wid1.setImage(rockImg);
        myTexture = rock
        makeMyMaterial()
        break;
      case Textures.indoor:
        wid1.setImage(indoorImg);
        myTexture = indoor
        makeMyMaterial()
        break;

    }
  }

  if (changed.key == "geometry") {
    switch (changed.value) {
      case Geometries.box:
        mesh.geometry = helper.createBox();
        console.log(1)
        break;
      case Geometries.bunny:
        mesh.geometry  = helper.createBunny();
        break;
      case Geometries.knot:
        mesh.geometry = helper.createKnot();
        break;
      case Geometries.quad:
        mesh.geometry = createQuad();
        break;
      case Geometries.sphere:
        mesh.geometry = helper.createSphere();
        break;

    }
  }

  if (changed.key == "shader") {
    switch (changed.value) {
      case Shaders.envMapping:
        myVertexShader = envMappingVertexShader,
        myFragmentShader = envMappingFragmentShader
        makeMyMaterial()
        break;
      case Shaders.fixSpherical:
        myVertexShader = fixSphericalVertexShader,
        myFragmentShader = fixSphericalFragmentShader
        makeMyMaterial()
        break;
      case Shaders.normalmap:
        myVertexShader = normalmapVertexShader,
        myFragmentShader = normalmapFragmentShader
        makeMyMaterial()
        break;
      case Shaders.spherical:
        myVertexShader = sphericalVertexShader,
        myFragmentShader = sphericalFragmentShader
        makeMyMaterial()
        console.log(2)
        break;
      case Shaders.uv:
        myVertexShader = uvVertexShader,
        myFragmentShader = uvFragmentShader
        makeMyMaterial()
        break;
    }
  }

  if (changed.key == "normalmap") {
    switch (changed.value) {
      case NormalMaps.lava_normals:
        normalTexture = lavaNormals
        makeMyMaterial()
        break;
      case NormalMaps.plastic_normals:
        normalTexture = plasticNormals
        makeMyMaterial()
        break;
      case NormalMaps.rock_normals:
        normalTexture = rockNormals
        makeMyMaterial()
        break;
      case NormalMaps.terracotta_normals:
        normalTexture = terracottaNormals
        makeMyMaterial()
        break;
      case NormalMaps.uniform_normals:
        normalTexture= uniformNormals
        makeMyMaterial()
        break;
      case NormalMaps.wood_ceiling_normals:
        normalTexture = woodCeilingNormals
        makeMyMaterial()
        break;
    }
  }
}



function main(){

    // setup/layout root Application.
  // Its the body HTMLElement with some additional functions.
  var root = Application("Texture");
  // define the (complex) layout, that will be filled later:
  root.setLayout([
    ["renderer1", "renderer2"],
    [".", "."]
  ]);
  // 1fr means 1 fraction, so 2fr 1fr means
  // the first column has 2/3 width and the second 1/3 width of the application
  root.setLayoutColumns(["1fr", "1fr"]);
  // you can use percentages as well, but (100/3)% is difficult to realize without fr.
  root.setLayoutRows(["100%", "0%"]);

  // ---------------------------------------------------------------------------
  // create Settings
  var settings = new Settings();
  // create GUI using settings
  var gui = createGUI(settings);
  gui.open();
  // adds the callback that gets called on settings change
  settings.addCallback(callback);

  // ---------------------------------------------------------------------------
  // create window with given id
  // the root layout will ensure that the window is placed right
  var renderer1Div = createWindow("renderer1");
  var renderer2Div = createWindow("renderer2");
  // add it to the root application
  root.appendChild(renderer1Div);
  root.appendChild(renderer2Div);

  // create renderer
  var renderer = new THREE.WebGLRenderer({
    antialias: true,  // to enable anti-alias and get smoother output
  });

  // create scene
  scene = new THREE.Scene();
  scene.add(mesh);

  // user ./helper.ts for building the scene


  // create camera
  var camera = new THREE.PerspectiveCamera();
  // user ./helper.ts for setting up the camera
  helper.setupCamera(camera, scene);

  // create controls
  var controls = new OrbitControls(camera, renderer2Div);
  // user ./helper.ts for setting up the controls
  helper.setupControls(controls);

  // fill the Window (renderDiv). In RenderWidget happens all the magic.
  // It handles resizes, adds the fps widget and most important defines the main animate loop.
  // You dont need to touch this, but if feel free to overwrite RenderWidget.animate
  wid1 = new ImageWidget(renderer1Div);
  var wid2 = new RenderWidget(renderer2Div, renderer, camera, scene, controls);
  // start the draw loop (this call is async)
  wid1.setImage(earthImg);
  wid2.animate();
  wid1.enableDrawing()
  
  mesh.material = new THREE.ShaderMaterial({
    uniforms: {
      myTexture: { value: myTexture },
      widTexture: { value: widTexture }
    },
    vertexShader: myVertexShader,
    fragmentShader: myFragmentShader
  });


  renderer1Div.addEventListener("mousemove", function() {
    drawingCanvas = wid1.getDrawingCanvas()
    widTexture = new THREE.CanvasTexture(drawingCanvas);
    makeMyMaterial()
  });
  
}



// call main entrypoint
main();
