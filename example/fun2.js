
const backgroundColor = 0x000000;

/*////////////////////////////////////////*/

var renderCalls = [];
function render () {
  requestAnimationFrame( render );
  renderCalls.forEach((callback)=>{ callback(); });
}
render();

/* //////////////////////////////////////// */

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );
camera.position.setFromSphericalCoords(200, Math.PI/2, Math.PI);

var renderer = new THREE.WebGLRenderer( { antialias: true } );
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
/*
var controls = new THREE.OrbitControls( camera );

controls.rotateSpeed = 0.3;
controls.zoomSpeed = 0.9;

controls.minDistance = 3;
controls.maxDistance = 20;

controls.minPolarAngle = 0; // radians
controls.maxPolarAngle = Math.PI /2; // radians

controls.enableDamping = true;
controls.dampingFactor = 0.05;

renderCalls.push(function(){
  controls.update()
});
*/

/* ////////////////////////////////////////////////////////////////////////// */


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

var axesHelper = new THREE.AxesHelper( 50 );
scene.add( axesHelper );

var loader = new THREE.GLTFLoader();
loader.crossOrigin = true;

var object = null;
loader.load( 'https://mshirazi.github.io/Welcome/example/brozyfixed5.glb', function ( data ) {
    object = data.scene;
    object.position.set(0, 0, 0);
    camera.lookAt(0, 0, 0);
    object.rotation.x = Math.PI/2;
     object.rotation.z = Math.PI;
   
    scene.add( object );
});


window.addEventListener("mousemove", onMouseMove, false);

function onMouseMove(event) {
  camera.position.setFromSphericalCoords(200, Math.PI/2,2* Math.PI * event.clientX / window.innerWidth);
  camera.lookAt(0, 0, 0);
  controls.update();
}

/* ////////////////////////////////////////////////////////////////////// */
