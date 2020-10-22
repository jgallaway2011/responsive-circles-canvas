var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var mouse = {
    x: undefined,
    y: undefined
}

var minRadius = 2;
var maxRadius = 40;
var numCircles = 800;
// var colorArray = ["#730E16", "#A64149", "#BF808C", "#D0E9F2", "#400606"]
var colorArray = ["#F20530", "#730220", "#2B718C", "#D9BC9A", "#BF1111"]

window.addEventListener("mousemove", function(event) {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
});

window.addEventListener("mouseout", function(event) {
    mouse.x = event.undefined;
    mouse.y = event.undefined;
});

window.addEventListener("touchmove", function(event) {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
});

window.addEventListener("touchend", function(event) {
    mouse.x = undefined;
    mouse.y = undefined;
});

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function Circle(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
        // this.r = Math.floor(Math.random() * 256);
        // this.g = Math.floor(Math.random() * 256);
        // this.b = Math.floor(Math.random() * 256);


        this.draw = function() {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            // c.strokeStyle = "blue"
            // c.strokeStyle = "rgba(" + this.r.toString() + "," + this.g.toString() + "," + this.b.toString() + ")";
            c.fillStyle = this.color;
            c.fill();
            c.stroke();
        }

        this.update = function() {
            this.draw();

            if (this.x - this.radius < 0 || this.x + this.radius > innerWidth) {
                this.dx = -this.dx
            }
            if (this.y - this.radius < 0 || this.y + this.radius > innerHeight) {
                this.dy = -this.dy
            }
            this.x += this.dx;
            this.y += this.dy;

            // Interactivity
            if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
                if (this.radius < maxRadius) {
                    this.radius += 1;
                }
            } else if (this.radius > this.minRadius) {
                this.radius -= 1;
            } else if (mouse.x === undefined && mouse.y === undefined && this.radius > this.minRadius) {
                this.radius -= 1;
            }
        }
    }

var circleArray = [];

function init() {
    circleArray = [];
    for (var i = 0; i < numCircles; i++) {
        var radius = Math.random() * 3 + 1;
        var diameter = radius * 2;
        var x = Math.random() * (innerWidth - diameter) + radius;
        var dx = (Math.random() - 0.5);
        var y = Math.random() * (innerHeight - diameter) + radius;
        var dy = (Math.random() - 0.5);
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}
 
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0,0,0)'
    c.fillRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

init();
animate();
