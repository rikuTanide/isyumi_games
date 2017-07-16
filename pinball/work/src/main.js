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
        width: 800,
        height: 600,
    }
});


var body = Bodies.circle(100, 100, 10, {
    friction: 0,
    restitution: 0.6,
});
World.add(world, body);

Engine.run(engine);
Render.run(render);
