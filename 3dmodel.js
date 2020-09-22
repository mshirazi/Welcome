
const backgroundColor = 0x000000;

/*////////////////////////////////////////*/

var renderCalls = [];
function render () {
  requestAnimationFrame( render );
  renderCalls.forEach((callback)=>{ callback(); });
}
render();

/* //////////////////////////////////////// */
// set up scene

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );
camera.position.setFromSphericalCoords(200, Math.PI/2, Math.PI);
const canvas = document.querySelector('#c');
var renderer = new THREE.WebGLRenderer( {
	canvas,
	alpha: true,
	antialias: true,
} );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( backgroundColor );//0x );

renderer.toneMapping = THREE.LinearToneMapping;
renderer.toneMappingExposure = Math.pow( 0.94, 5.0 );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

window.addEventListener( 'resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

document.body.appendChild( renderer.domElement);

function renderScene(){ renderer.render( scene, camera ); }
renderCalls.push(renderScene);

/* ////////////////////////////////////////////////////////////////////////// */
// set up lighting

var light = new THREE.PointLight( 0xffffcc, 20, 0 );
light.position.set(0, 500, 0);
scene.add( light );

var light = new THREE.PointLight( 0xffffcc, 20, 0 );
light.position.set(-500, 500, 0);
scene.add( light );

var light = new THREE.PointLight( 0xffffcc, 20, 0 );
light.position.set(500, 0, -500);
scene.add( light );


/* ////////////////////////////////////////////////////////////////////////// */

/*
//for help rotating
var axesHelper = new THREE.AxesHelper( 50 );
scene.add( axesHelper );
*/

//import model using three.js GLTF loader

var loader = new THREE.GLTFLoader();
var dracoloader = new THREE.DRACOLoader();

dracoloader.setDecoderPath( 'https://unpkg.com/three@0.120.1/examples/js/libs/draco/' )
loader.setDRACOLoader( dracoloader );

//loader.setDecoderPath( 'https://unpkg.com/three@0.120.1/examples/js/libs/draco/' );
loader.crossOrigin = true;

var object = null;
loader.load( 'https://mshirazi.github.io/Welcome/compressed.glb', function ( data ) {
    object = data.scene;
    object.position.set(0, 0, 0);
    camera.lookAt(0, 0, 0);
    object.rotation.x = Math.PI/2;
    object.rotation.z = Math.PI;
    scene.add( object );
});

// make camera rotate around model (model is at the origin, and is loaded in a function (and is a very large file)
//so it's more simple to move the camera around instead)

window.addEventListener("mousemove", onMouseMove, false);

function onMouseMove(event) {
	// honestly I trialed and errored the formula for the camera's movement, since I couldn't find documentation
	// on whether three.js uses the physicist or the mathematician's spherical coordinates, but spherical
	// coordinates are clearly the best choice for this kind of motion
	camera.position.setFromSphericalCoords(200, Math.PI/2,2* Math.PI * event.clientX / window.innerWidth);
	camera.lookAt(0, 0, 0);
}

/* ////////////////////////////////////////////////////////////////////// */
