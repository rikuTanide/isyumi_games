var Engine = Matter.Engine,
    // Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;

var engine;
var world;
var particles = [];
var mConstraint;
function setup() {
    var canvas = createCanvas(400, 400);
    engine = Engine.create();
    world = engine.world;
    var prev = null;
    for (var x = 200; x < 400; x += 20) {
        var p = new Particle(x, 100, 5, x == 200);
        particles.push(p);

        if (prev) {

            var options = {
                bodyA: p.body,
                bodyB: prev.body,
                length: 20,
                stiffness: 0.4
            };
            var constraint = Constraint.create(options);
            World.add(world, constraint);
        }
        prev = p;
    }
    //


    var canvasMouse = Mouse.create(canvas.elt);
    canvasMouse.pixelRatio = pixelDensity();
    console.log(canvasMouse);
    var options = {
        mouse: canvasMouse,
    };

    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);
}
//
// function mousePressed() {
//     circles.push(new Circle(mouseX, mouseY, random(5, 10)));
// }

function Circle(x, y, r) {
    var options = {
        friction: 0,
        restitution: 0.6,
    };
    this.body = Bodies.circle(x, y, r, options);
    World.add(world, this.body);
    this.r = r;
    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(127);
        ellipse(0, 0, this.r * 2);
        pop();
    };
    this.isOffScreen = function () {
        var pos = this.body.position;
        return (pos.y > height + 100)
    };
    this.removeFromWorld = function () {
        World.remove(world, this.body);
    }

}

function Boundary(x, y, w, h, a) {
    var options = {
        friction: 0.3,
        restitution: 0,
        isStatic: true,
        angle: a,
    };
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(0);
        rect(0, 0, this.w, this.h);
        pop();
    }
}

function Particle(x, y, r, fixed) {
    var options = {
        friction: 0,
        restitution: 0.95,
        isStatic: fixed,
    };
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    World.add(world, this.body);
    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(127);
        ellipse(0, 0, this.r * 2);
        pop();
    }
}


function draw() {
    background(51);

    Engine.update(engine);

    for (var i = 0; i < particles.length; i++) {
        particles[i].show();
    }
    line(
        particles[0].body.position.x,
        particles[0].body.position.y,
        particles[1].body.position.x,
        particles[1].body.position.y);


}