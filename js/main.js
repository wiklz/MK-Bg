
var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas')});
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// CAMERA
var camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 3000 );
// SCENE
var scene = new THREE.Scene();
// LIGHT
var light = new THREE.AmbientLight(0xffffff, 0.5);
var pointLight = new THREE.PointLight(0xffffff, 0.5);

scene.add(light, pointLight);
//LOADER
var loader = new THREE.GLTFLoader();
loader.load('./js/gltf/test2.gltf',
    function ( gltf ) {

        scene.add( gltf.scene );


        gltf.scene; // THREE.Scene
        gltf.scenes; // Array<THREE.Scene>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

    },
    // called when loading is in progresses
    function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    // called when loading has errors
    function ( error ) {

        console.log( 'An error happened' );

    }
    );

// MODEL

//RENDER LOOP
render();
function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}