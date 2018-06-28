if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, stats, controls;
var camera, scene, renderer, light, spotLight, spotLight2, mesh, mousePos;

init();
animate();


function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 100 );
    camera.position.set( 0, 0, 5 );

    controls = new THREE.OrbitControls( camera );
    controls.target.set( 0, -0.2, -0.2 );
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = 0.05;
    controls.minAzimuthAngle = - Math.PI / 6;
    controls.maxAzimuthAngle = Math.PI / 6;
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = Math.PI / 1.5;
    // controls.enabled = false;
    controls.update();

    // envmap
    // var path = './Bridge2/';
    // var format = '.jpg';
    // var envMap = new THREE.CubeTextureLoader().load( [
    //     path + 'posx' + format, path + 'negx' + format,
    //     path + 'posy' + format, path + 'negy' + format,
    //     path + 'posz' + format, path + 'negz' + format
    // ] );

    scene = new THREE.Scene();
    // scene.background = envMap;


    // LIGHTS
    // light = new THREE.HemisphereLight( 0xffffff, 0x444422 );
    // light = new THREE.AmbientLight( 0x2C2C2C );
    // light.position.set( 0, 1, 0 );
    // scene.add( light );

    spotLight = new THREE.SpotLight(0xffffff, 10, 20);
    spotLight.position.set( 5, 10, 15 );
    spotLight.angle = 0.065;
    spotLight.penumbra = 1;
    spotLight.decay = 2;


    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

    scene.add( spotLight );

    spotLight2 = new THREE.SpotLight({color: 0xB2B2B2, intensity: 1, angle: 0});
    spotLight2.position.set( 5, 10, -15 );

    spotLight2.castShadow = true;

    spotLight2.shadow.mapSize.width = 1024;
    spotLight2.shadow.mapSize.height = 1024;

    spotLight2.shadow.camera.near = 500;
    spotLight2.shadow.camera.far = 4000;
    spotLight2.shadow.camera.fov = 30;

    scene.add( spotLight2 );

    //HELPERS
    // var spotLightHelper = new THREE.SpotLightHelper( spotLight );
    // var spotLightHelper2 = new THREE.SpotLightHelper( spotLight2 );
    // var axesHelper = new THREE.AxesHelper( 5 );
    // scene.add( spotLightHelper );
    // scene.add( spotLightHelper2 );
    // scene.add( axesHelper );



    // model
    var loader = new THREE.GLTFLoader();
    loader.load( './js/gltf/test2.gltf', function ( gltf ) {

        gltf.scene.traverse( function ( child ) {

            if ( child.isMesh ) {

                // child.material = envMap;

            }

        } );
        mesh = gltf.scene;
        scene.add( gltf.scene );
    } );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.gammaOutput = true;
    container.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
    window.addEventListener( 'resize', onWindowResize, false );
    requestAnimationFrame( animate );

    if (mesh) {

        window.onmousemove = logMouseMove;

        function logMouseMove(e) {
            e = event || window.event;
            mousePos = { x: e.clientX, y: e.clientY };
            // console.log(mousePos);
            // return mousePos;
        }
        // mesh.rotation.y += 0.005;
        if (mousePos) {
            mesh.rotation.x = mousePos.y * 0.001;
            mesh.rotation.y = mousePos.x * 0.001;
            // if (mesh.rotation.y === Math.PI / 3){
            //  mesh.rotateY(0.001);
        }
    }
    // mesh.rotation.x += 0.001;
    // controls.minPolarAngle = Math.PI / 3;
    // controls.maxPolarAngle = Math.PI / 1.5;

    render();
}
function render() {
    renderer.render( scene, camera );
}