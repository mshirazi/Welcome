var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var loader = new THREE.GLTFLoader();

loader.load( './brozybig.glb', function ( gltf ) {

	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );
	var light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );

	camera.position.z = 5;

	var animate = function () {
		requestAnimationFrame( animate );

		renderer.render( scene, camera );
	};

	animate();

