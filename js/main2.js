if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, stats, controls;
var camera, scene, renderer, light, spotLight, spotLight2, mesh, mousePos;


init();
animate();


function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    // CAMERA
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 100 );
    camera.position.set( 0, 0, 5 );

    // CONTROLS
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

    // SCENE
    scene = new THREE.Scene();


    // LIGHTS
    spotLight = new THREE.SpotLight(0xC5C584, 15, 20);
    spotLight.position.set( 5, 10, 15 );
    spotLight.angle = 0.09;
    spotLight.penumbra = 1;
    spotLight.decay = 1.5;

    scene.add( spotLight );

    spotLight2 = new THREE.SpotLight(0xB2B2B2);
    spotLight2.position.set( 5, 10, -15 );

    scene.add( spotLight2 );

    // TODO
    //         1
    // spotLight.castShadow = true;
    // spotLight.shadow.mapSize.width = 1024;
    // spotLight.shadow.mapSize.height = 1024;
    // spotLight.shadow.camera.near = 500;
    // spotLight.shadow.camera.far = 4000;
    // spotLight.shadow.camera.fov = 30;

            // 2
    // spotLight2.castShadow = true;
    // spotLight2.shadow.mapSize.width = 1024;
    // spotLight2.shadow.mapSize.height = 1024;
    // spotLight2.shadow.camera.near = 500;
    // spotLight2.shadow.camera.far = 4000;
    // spotLight2.shadow.camera.fov = 30;

    //HELPERS
    // var spotLightHelper = new THREE.SpotLightHelper( spotLight );
    // var spotLightHelper2 = new THREE.SpotLightHelper( spotLight2 );
    // var axesHelper = new THREE.AxesHelper( 5 );
    // scene.add( spotLightHelper );
    // scene.add( spotLightHelper2 );
    // scene.add( axesHelper );



    // MK LOGO
    var loader = new THREE.GLTFLoader();
    loader.load( './js/gltf/test2.gltf', function ( gltf ) {
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
        }

        // MOUSE POSITIONS
        if (mousePos) {

            // X axis
            if(mousePos.y <= height25){
                mesh.rotation.x -= 0.001;

                if(mesh.rotation.x <= -0.47){
                    mesh.rotation.x = -0.47;
                }
            }
            else if(mousePos.y > height25 && mousePos.y < height75){

                if (mesh.rotation.x < 0){
                    mesh.rotation.x += 0.001;

                    if (mesh.rotation.x >= 0){
                        mesh.rotation.x = 0;
                    }
                }
                if (mesh.rotation.x > 0){
                    mesh.rotation.x -= 0.001;

                    if (mesh.rotation.x <= 0){
                        mesh.rotation.x = 0;
                    }
                }
            }
            else {
                mesh.rotation.x += 0.001;

                if(mesh.rotation.x >= 0.47){
                    mesh.rotation.x = 0.47;
                }
            }

            // Y axis
            if(mousePos.x <= width25){
                mesh.rotation.y -= 0.001;

                if(mesh.rotation.y <= -0.47){
                    mesh.rotation.y = -0.47;
                }
            }
            else if(mousePos.x > width25 && mousePos.x < width75){

                if (mesh.rotation.y < 0){
                    mesh.rotation.y += 0.001;

                    if (mesh.rotation.y >= 0){
                        mesh.rotation.y = 0;
                    }
                }
                if (mesh.rotation.y > 0){
                    mesh.rotation.y -= 0.001;

                    if (mesh.rotation.y <= 0){
                        mesh.rotation.y = 0;
                    }
                }
            }
            else {
                mesh.rotation.y += 0.001;

                if(mesh.rotation.y >= 0.47){
                    mesh.rotation.y = 0.47;
                }
            }
        }
        else {
            mesh.rotation.x = 0;
            mesh.rotation.y = 0;
        }
    }

    render();
}

function render() {
    renderer.render( scene, camera );
}

// CAPTURING MOUSE STATES VARS
var width100, width75, width50, width25, width0, height100, height75, height50, height25, height0;
width0 = 0;
width25 = window.innerWidth / 4;
width50 = window.innerWidth / 2;
width75 = window.innerWidth * 0.75;
width100 = window.innerWidth;

height0 = 0;
height25 = window.innerHeight / 4;
height50 = window.innerHeight / 2;
height75 = window.innerHeight * 0.75;
height100 = window.innerHeight;