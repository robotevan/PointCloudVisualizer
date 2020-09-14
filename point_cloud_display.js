let scene, camera, renderer, geometry;

import * as THREE from 'https://threejs.org/build/three.module.js'; 
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';
geometry = new THREE.BufferGeometry();
geometry.attributes.attr
//import { BufferGeometry } from 'https://threejs.org/';
function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
    renderer = new THREE.WebGLRenderer( {antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    camera.position.z = 50;
    camera.position.y = 50;
    var controls = new OrbitControls( camera, renderer.domElement );
	controls.minDistance = 50;
    controls.maxDistance = 150;
}

function onResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onResize, false );


function read_points(){
    var request = new XMLHttpRequest();
    request.open("GET", "room_data.txt", false);
    request.send(null);

    var positions = [];
    var color = [];
    var jsonObject = request.responseText.split(/\r?\n|\r/);
    for (var i = 0; i < jsonObject.length; i++){
        var point = (jsonObject[i]).split(',');
        if (point[0] != null && point[1] != null && point[2] != null){
            positions.push(point[0]);
            positions.push(point[2]);
            positions.push(point[1]);
            color.push(255);
            color.push(255);
            color.push(255);
        }
        

    }
    if ( positions.length > 0 ) geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    if ( color.length > 0 ) geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( color, 3 ) );
    geometry.computeBoundingSphere();
    var material = new THREE.PointsMaterial( {vertexColors: THREE.VertexColors, size: 0.9} );
    var mesh = new THREE.Points( geometry, material );
    scene.add( mesh );

}    

var render = function () {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};

init();

read_points();
render();
console.log("DONE");