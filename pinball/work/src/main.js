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

var ball = Bodies.circle(100, 100, 10, {
    friction: 1,
    restitution: 1,
});


var bumper_right = Bodies.rectangle(200, 410, 80, 10);
var constraint_pivot_right = Constraint.create({
    pointA: {x: 240, y: 410},
    bodyB: bumper_right,
    pointB: {x: 40, y: 0},
});
var pin_right1 = Bodies.rectangle(230, 200, 5, 400, {isStatic: true});
var pin_right2 = Bodies.rectangle(230, 470, 5, 100, {isStatic: true});

var bumper_left = Bodies.rectangle(100, 410, 80, 10);
var constraint_pivot_left = Constraint.create({
    pointA: {x: 60, y: 410},
    bodyB: bumper_left,
    pointB: {x: -40, y: 0},
});
var pin_left1 = Bodies.rectangle(70, 200, 5, 400, {isStatic: true});
var pin_left2 = Bodies.rectangle(70, 470, 5, 100, {isStatic: true});


World.add(world, [ball, wall_left, wall_right, wall_top, bumper_right, constraint_pivot_right, pin_right1, pin_right2,
    bumper_left, constraint_pivot_left, pin_left1, pin_left2]);

Render.run(render);

function left() {
    Body.applyForce(bumper_left, bumper_left.position, Vector.create(0, -0.06));
}

function right() {
    Body.applyForce(bumper_right, bumper_right.position, Vector.create(0, -0.06));
}

function space() {
    Body.setPosition(ball, {x: 80, y: 15});
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

document.getElementById('left').addEventListener('click',function(){
    left();
});
document.getElementById('right').addEventListener('click',function(){
    right();
});
document.getElementById('space').addEventListener('click',function(){
    space();
});


var runner = Runner.create();
Runner.run(runner, engine);