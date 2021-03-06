var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Body = Matter.Body,
    Vector = Matter.Vector,
    Runner = Matter.Runner,
    Events = Matter.Events;


var engine = Engine.create();
var world = engine.world;


var wall_left = Bodies.rectangle(0, 530 / 2, 10, 530, {isStatic: true});
var wall_right = Bodies.rectangle(295, 530 / 2, 10, 530, {isStatic: true});
var wall_top = Bodies.rectangle(150, 5, 300, 10, {isStatic: true});

var ball = Bodies.circle(50, 50, 10, {
    friction: 1,
    restitution: 1,
    label: "ball",
});

var bumper_right = Bodies.rectangle(200, 420, 90, 20);
var constraint_pivot_right = Constraint.create({
    pointA: {x: 240, y: 420},
    bodyB: bumper_right,
    pointB: {x: 40, y: 0},
});
var pin_right1 = Bodies.rectangle(300, 360, 100, 100, {isStatic: true, angle: Math.PI / 3.5});
var pin_right2 = Bodies.rectangle(280, 380, 100, 50, {isStatic: true});
var pin_right3 = Bodies.rectangle(230, 490, 5, 100, {isStatic: true});

var bumper_left = Bodies.rectangle(100, 420, 90, 20);
var constraint_pivot_left = Constraint.create({
    pointA: {x: 60, y: 420},
    bodyB: bumper_left,
    pointB: {x: -40, y: 0},
});
var pin_left1 = Bodies.rectangle(0, 370, 100, 100, {isStatic: true, angle: Math.PI / 1.5});
var pin_left2 = Bodies.rectangle(20, 380, 100, 50, {isStatic: true});
var pin_left3 = Bodies.rectangle(70, 490, 5, 100, {isStatic: true});


World.add(world, [ball, wall_left, wall_right, wall_top,
    bumper_right, constraint_pivot_right, pin_right1, pin_right2, pin_right3,
    bumper_left, constraint_pivot_left, pin_left1, pin_left2, pin_left3]);


/* ここから障害物 */

var circle1 = Bodies.circle(100, 100, 20, {
    label: 'circle1',
});
var constraint_circle1 = Constraint.create({
    pointA: {x: 100, y: 100,},
    bodyB: circle1,
    stiffness: 1,
    length: 30,
});

var circle2 = Bodies.circle(220, 100, 20, {
    label: 'circle2',

});
var constraint_circle2 = Constraint.create({
    pointA: {x: 220, y: 100,},
    bodyB: circle2,
    stiffness: 1,
    length: 30,

});

var circle3 = Bodies.circle(150, 50, 20, {
    label: 'circle3',

});
var constraint_circle3 = Constraint.create({
    pointA: {x: 150, y: 50,},
    bodyB: circle3,
    stiffness: 1,
    length: 30,

});


World.add(world, [
    circle1, constraint_circle1,
    circle2, constraint_circle2,
    circle3, constraint_circle3,

]);


function left() {
    Body.applyForce(bumper_left, bumper_left.position, Vector.create(0, -0.18));
}

function right() {
    Body.applyForce(bumper_right, bumper_right.position, Vector.create(0, -0.18));
}

function space() {
    Body.setPosition(ball, {x: 290, y: 10});
    Body.setVelocity(ball, {x: 0, y: 0});

}

var count = 0;
var board = document.getElementById('score');
function countup() {
    count++;
    board.textContent = count;
}

Matter.Events.on(engine, 'collisionStart', function (event) {
    var i, pair,
        length = event.pairs.length;

    for (i = 0; i < length; i++) {
        pair = event.pairs[i];
        var al = pair.bodyA.label;
        var bl = pair.bodyB.label;

        if (al == 'ball' || bl == 'ball') {
            if (al == 'circle1' || bl == 'circle1' || al == 'circle2' || bl == 'circle2' || al == 'circle3' || bl == 'circle3') {
                countup();
            }

        }

    }
});


document.addEventListener('keydown', function (e) {
    if (e.keyCode == 32) {
        space();
    }
    if (e.keyCode == 74) {
        right();
    }
    if (e.keyCode == 70) {
        left();
    }

});

document.getElementById('left').addEventListener('click', function () {
    left();
});
document.getElementById('right').addEventListener('click', function () {
    right();
});
document.getElementById('space').addEventListener('click', function () {
    space();
});


var runner = Runner.create();
Runner.run(runner, engine);


var scene = new THREE.Scene();
var width = 300;
var height = 470;
var camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 10000);
camera.position.z = 300;

var geometry = new THREE.BoxGeometry(200, 200, 200);
var material = new THREE.MeshLambertMaterial({color: 0xffffff});

var pin1_geometry_left = new THREE.BoxGeometry(100, 100, 1);
var mesh = new THREE.Mesh(pin1_geometry_left, material);
mesh.position.set(-(300 / 2), ( 470 / 2) - 370, 0);
mesh.rotation.z = Math.PI / -1.5;
scene.add(mesh);


var pin2_geometry_left = new THREE.BoxGeometry(100, 50, 1);
var mesh = new THREE.Mesh(pin2_geometry_left, material);
mesh.position.set(-130, (470 / 2) - 380, 0);
scene.add(mesh);

var pin3_geometry_left = new THREE.BoxGeometry(5, 100, 1);
var mesh = new THREE.Mesh(pin3_geometry_left, material);
mesh.position.set((300 / 2) - (300 - 70), (470 / 2) - 490, 0);
scene.add(mesh);

var bumper_left_geometry = new THREE.BoxGeometry(90, 20, 1);
var bumper_left_geometry_mesh = new THREE.Mesh(bumper_left_geometry, material);
bumper_left_geometry_mesh.position.set((300 / 2) - (300 - 100), (470 / 2) - 420, 0);
scene.add(bumper_left_geometry_mesh);

var pin1_geometry_right = new THREE.BoxGeometry(100, 100, 1);
var mesh = new THREE.Mesh(pin1_geometry_right, material);
mesh.position.set((300 / 2) - (300 - 300), ( 470 / 2) - 360, 0);
mesh.rotation.z = Math.PI / -3.5;
scene.add(mesh);

var pin2_geometry_right = new THREE.BoxGeometry(100, 50, 1);
var mesh = new THREE.Mesh(pin2_geometry_right, material);
mesh.position.set((300 / 2 ) - (300 - 280), (470 / 2) - 380, 0);
scene.add(mesh);

var pin3_geometry_right = new THREE.BoxGeometry(5, 100, 1);
var mesh = new THREE.Mesh(pin3_geometry_right, material);
mesh.position.set((300 / 2) - (300 - 230), (470 / 2) - 490, 0);
scene.add(mesh);

var bumper_right_geometry = new THREE.BoxGeometry(90, 20, 1);
var bumper_right_geometry_mesh = new THREE.Mesh(bumper_right_geometry, material);
bumper_right_geometry_mesh.position.set((300 / 2) - (300 - 200), (470 / 2) - 420, 0);
scene.add(bumper_right_geometry_mesh);

var ball_geometry = new THREE.SphereGeometry(10);
var ball_mesh = new THREE.Mesh(ball_geometry, new THREE.MeshLambertMaterial({color: 0x00ff00}));
scene.add(ball_mesh);


var ball_l = new THREE.PointLight(0x00ff00);
scene.add(ball_l);
var ball_l_h = new THREE.PointLightHelper(ball_l, 10);
scene.add(ball_l_h);


var circle1_geometry = new THREE.SphereGeometry(20,50,50);
var circle1_mesh = new THREE.Mesh(circle1_geometry, material);
scene.add(circle1_mesh);

var line1_geometry = new THREE.Geometry();
line1_geometry.vertices.push(new THREE.Vector3((300 / 2) - (300 - 100), (470 / 2) - 100, 0));
line1_geometry.vertices.push(new THREE.Vector3(0, 0, 0));

var line = new THREE.Line(line1_geometry, new THREE.LineBasicMaterial({color: 0xffffff}));

scene.add(line);

var circle2_geometry = new THREE.SphereGeometry(20,50,50);
var circle2_mesh = new THREE.Mesh(circle2_geometry, material);
scene.add(circle2_mesh);

var line2_geometry = new THREE.Geometry();
line2_geometry.vertices.push(new THREE.Vector3((300 / 2) - (300 - 220), (470 / 2) - 100, 0));
line2_geometry.vertices.push(new THREE.Vector3(0, 0, 0));
var line = new THREE.Line(line2_geometry, new THREE.LineBasicMaterial({color: 0xffffff}));

scene.add(line);


var circle3_geometry = new THREE.SphereGeometry(20, 50, 50);
var circle3_mesh = new THREE.Mesh(circle3_geometry, material);
scene.add(circle3_mesh);


var line3_geometry = new THREE.Geometry();
line3_geometry.vertices.push(new THREE.Vector3((300 / 2) - (300 - 150), (470 / 2) - 50, 0));
line3_geometry.vertices.push(new THREE.Vector3(0, 0, 0));
var line = new THREE.Line(line3_geometry, new THREE.LineBasicMaterial({color: 0xffffff}));
scene.add(line);


var wall = new THREE.BoxGeometry(10, 530, 1);
var mesh = new THREE.Mesh(wall, material);
mesh.position.set((300 / 2 ) - (300), (470 / 2) - (530 / 2), 0);
scene.add(mesh);

var wall = new THREE.BoxGeometry(10, 530, 1);
var mesh = new THREE.Mesh(wall, material);
mesh.position.set((300 / 2 ) - (300 - 295), (470 / 2) - (530 / 2), 0);
scene.add(mesh);

var wall = new THREE.BoxGeometry(300, 10, 1);
var mesh = new THREE.Mesh(wall, material);
mesh.position.set((300 / 2 ) - (300 - 150), (470 / 2) - 5, 0);
scene.add(mesh);

var directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(0, -100, 100);
scene.add(directionalLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight.position.set(0, 100, 100);
scene.add(directionalLight);

renderer = new THREE.WebGLRenderer();
renderer.setSize(300, 430);

document.getElementById('view').appendChild(renderer.domElement);

function animate() {
    requestAnimationFrame(animate);

    bumper_left_geometry_mesh.rotation.z = -bumper_left.angle;
    bumper_left_geometry_mesh.position.x = (300 / 2) - (300 - bumper_left.position.x);
    bumper_left_geometry_mesh.position.y = (470 / 2) - bumper_left.position.y;

    bumper_right_geometry_mesh.rotation.z = -bumper_right.angle;
    bumper_right_geometry_mesh.position.x = (300 / 2) - (300 - bumper_right.position.x);
    bumper_right_geometry_mesh.position.y = (470 / 2) - bumper_right.position.y;

    ball_mesh.position.x = (300 / 2) - (300 - ball.position.x);
    ball_mesh.position.y = (470 / 2) - ball.position.y;

    ball_l.position.x = (300 / 2) - (300 - ball.position.x);
    ball_l.position.y = (470 / 2) - ball.position.y;


    circle1_mesh.position.x = (300 / 2) - (300 - circle1.position.x);
    circle1_mesh.position.y = (470 / 2) - circle1.position.y;

    line1_geometry.vertices[1] = new THREE.Vector3((300 / 2) - (300 - circle1.position.x), (470 / 2) - circle1.position.y, 0);
    line1_geometry.verticesNeedUpdate = true

    circle2_mesh.position.x = (300 / 2) - (300 - circle2.position.x);
    circle2_mesh.position.y = (470 / 2) - circle2.position.y;

    line2_geometry.vertices[1] = new THREE.Vector3((300 / 2) - (300 - circle2.position.x), (470 / 2) - circle2.position.y, 0);
    line2_geometry.verticesNeedUpdate = true

    circle3_mesh.position.x = (300 / 2) - (300 - circle3.position.x);
    circle3_mesh.position.y = (470 / 2) - circle3.position.y;

    line3_geometry.vertices[1] = new THREE.Vector3((300 / 2) - (300 - circle3.position.x), (470 / 2) - circle3.position.y, 0);
    line3_geometry.verticesNeedUpdate = true

    renderer.render(scene, camera);
}

animate();