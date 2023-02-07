// 设置画布

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

// 生成随机数的函数

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// 为程序中的小球建立模型
function Ball(x, velX, color, size) {
  this.x = x;
  this.velX = velX;
  this.color = color;
  this.size = size;
}

//画小球
Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

//
let testBall = new Ball(150, 4, "green", 10);
testBall.draw();

Ball.prototype.update = function () {
  this.x += this.velX;

  if (this.x + this.size >= width) {
    this.x = 0;
  } else {
    this.y = Math.sin((this.x / 800) * 2 * Math.PI) * 280 + 300;
  }
};

// 让球动起来
// 首先我们需要一个地方储存小球
let balls = [];

while (balls.length < 1) {
  let size = 3;
  let ball = new Ball(random(1, 1), 0.5, "rgb(198, 95, 251)", size);
  balls.push(ball);
}

times = 0;

function loop() {
  if (times > 2000) {
    // ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.clearRect(0, 0, 1200, 600);
    times = 0;
  }
  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
  }

  requestAnimationFrame(loop);
  times += 1;
  // console.log(times);
}
loop();
