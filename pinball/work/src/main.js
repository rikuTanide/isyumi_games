var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;


var engine = Engine.create();
var world = engine.world;
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 300,
        height: 530,
    }
});


var wall_left = Bodies.rectangle(0, 530 / 2, 10, 530, {isStatic: true});
var wall_right = Bodies.rectangle(295, 530 / 2, 10, 530, {isStatic: true});
var wall_bottom = Bodies.rectangle(150, 525, 300, 10, {isStatic: true});
var wall_top = Bodies.rectangle(150, 5, 300, 10, {isStatic: true});

var body = Bodies.circle(100, 100, 10, {
    friction: 0,
    restitution: 0.6,
});
World.add(world, [body, wall_left, wall_bottom, wall_right, wall_top]);

Engine.run(engine);
Render.run(render);
