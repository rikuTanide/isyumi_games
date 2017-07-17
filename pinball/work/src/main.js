var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Body = Matter.Body,
    Vector = Matter.Vector,
    Runner = Matter.Runner;


var engine = Engine.create();
var world = engine.world;
var render = Render.create({
    element: document.getElementById('view'),
    engine: engine,
    options: {
        width: 300,
        height: 470,
    }
});


var wall_left = Bodies.rectangle(0, 530 / 2, 10, 530, {isStatic: true});
var wall_right = Bodies.rectangle(295, 530 / 2, 10, 530, {isStatic: true});
// var wall_bottom = Bodies.rectangle(150, 465, 300, 10, {isStatic: true, restitution: 1});
var wall_top = Bodies.rectangle(150, 5, 300, 10, {isStatic: true});

var ball = Bodies.circle(50, 50, 10, {
    friction: 1,
    restitution: 1,
});


var bumper_right = Bodies.rectangle(200, 420, 80, 20);
var constraint_pivot_right = Constraint.create({
    pointA: {x: 240, y: 420},
    bodyB: bumper_right,
    pointB: {x: 40, y: 0},
});
var pin_right1 = Bodies.rectangle(300, 360, 100, 100, {isStatic: true, angle: Math.PI / 3.5});
var pin_right2 = Bodies.rectangle(280, 380, 100, 50, {isStatic: true});
var pin_right3 = Bodies.rectangle(230, 490, 5, 100, {isStatic: true});

var bumper_left = Bodies.rectangle(100, 420, 80, 20);
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

var circle1 = Bodies.circle(100, 100, 20);
var constraint_circle1 = Constraint.create({
    pointA: {x: 100, y: 100,},
    bodyB: circle1,
    stiffness: 1,
    length: 30,
});

var circle2 = Bodies.circle(220, 100, 20);
var constraint_circle2 = Constraint.create({
    pointA: {x: 220, y: 100,},
    bodyB: circle2,
    stiffness: 1,
    length: 30,
});

var circle3 = Bodies.circle(150, 50, 20);
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

Render.run(render);

function left() {
    Body.applyForce(bumper_left, bumper_left.position, Vector.create(0, -0.15));
}

function right() {
    Body.applyForce(bumper_right, bumper_right.position, Vector.create(0, -0.15));
}

function space() {
    Body.setPosition(ball, {x: 100, y: 10});
    Body.setVelocity(ball, {x: 0, y: 0});

}

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