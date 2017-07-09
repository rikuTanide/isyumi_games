var loader = new THREE.FontLoader();

loader.load('helvetiker_regular.typeface.json', function (font) {

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    camera.position.set(0, 0, -100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var scene = new THREE.Scene();


    var TextGeometry = new THREE.TextGeometry('Three.js!', {
        size: 30, height: 4, curveSegments: 3,
        font: font, style: "normal",
        bevelThickness: 1, bevelSize: 2, bevelEnabled: true
    });
    var Material = new THREE.MeshLambertMaterial({color: 0x00ff00});
    var Text = new THREE.Mesh(TextGeometry, Material);

    scene.add(Text);
    renderer.render(scene, camera);
});