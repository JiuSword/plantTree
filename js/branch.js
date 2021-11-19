//随机数函数
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}

//春季树
function springBranch() {
  this.x = initX;
  this.y = initY;
  this.ctx = canvas.getContext('2d');
  this.radius = 5;
  this.angle = Math.PI / 2;
  this.rate = Math.tan(this.angle);
  this.fillStyle = '#956e5c'; //树枝颜色
  this.shadowBlur = 0.8; //树枝阴影模糊度
  this.length = Math.random() * 60 + 40; //树枝长度
  this.nowLength = 0; //当前长度
  this.generation = 1; //代
  this.raiseLength = this.radius; //每次增长长度
}
//夏季树
function summerBranch() {
  this.x = initX;
  this.y = initY;
  this.ctx = canvas.getContext('2d');
  this.radius = 5;
  this.angle = Math.PI / 2;
  this.rate = Math.tan(this.angle);
  this.fillStyle = '#44210c'; //树枝颜色
  this.shadowBlur = 0.8; //树枝阴影模糊度
  this.length = Math.random() * 60 + 40; //树枝长度
  this.nowLength = 0; //当前长度
  this.generation = 1; //代
  this.raiseLength = this.radius; //每次增长长度
}
//秋季树
function autumnBranch() {
  this.x = initX;
  this.y = initY;
  this.ctx = canvas.getContext('2d');
  this.radius = 5;
  this.angle = Math.PI / 2;
  this.rate = Math.tan(this.angle);
  this.fillStyle = '#832309'; //树枝颜色
  this.shadowBlur = 0.8; //树枝阴影模糊度
  this.length = Math.random() * 60 + 40; //树枝长度
  this.nowLength = 0; //当前长度
  this.generation = 1; //代
  this.raiseLength = this.radius; //每次增长长度
}
//冬季树
function winterBranch() {
  this.x = initX;
  this.y = initY;
  this.ctx = canvas.getContext('2d');
  this.radius = 5;
  this.angle = Math.PI / 2;
  this.rate = Math.tan(this.angle);
  this.fillStyle = '#191a0e'; //树枝颜色
  this.shadowBlur = 2; //树枝阴影模糊度
  this.length = Math.random() * 60 + 40; //树枝长度
  this.nowLength = 0; //当前长度
  this.generation = 1; //代
  this.raiseLength = this.radius; //每次增长长度
}
//夜晚荧光树
function nightBranch() {
  this.x = initX;
  this.y = initY;
  this.ctx = canvas.getContext('2d');
  this.radius = 5;
  this.angle = Math.PI / 2;
  this.rate = Math.tan(this.angle);
  this.fillStyle = 'white'; //树枝颜色
  this.shadowBlur = 0.8; //树枝阴影模糊度
  this.shadowColor = colorArr[color];
  this.length = Math.random() * 60 + 40; //树枝长度
  this.nowLength = 0; //当前长度
  this.generation = 1; //代
  this.raiseLength = this.radius; //每次增长长度
}
//春季树
springBranch.prototype = {
  start() {
    this.draw();
    this.grow();
    this.die();
    this.flower();
    this.branch();
  },
  draw() {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = this.fillStyle;
    ctx.shadowColor = this.shadowColor;
    ctx.shadowBlur = this.shadowBlur;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    // 通过在当前点画圆填充形成图形
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },
  grow() {
    this.x += this.raiseLength * Math.cos(this.angle);
    this.y -= this.raiseLength * Math.sin(this.angle);
    this.nowLength += this.raiseLength;
    // this.radius *= 1 - this.generation / 500;
    this.radius /= Math.pow(1.1, this.generation / 200);
    /* if (this.raiseLength > this.radius * 2) {
          this.raiseLength = this.radius * 2;
        } */
  },
  flower() {
    if (this.radius < 0.05) {
      var r = 2.5 + Math.random() * 2.5;
      let ctx = this.ctx;
      var my_gradient = ctx.createLinearGradient(0, 0, 0, 170);
      my_gradient.addColorStop(randomNum(0, 0.1), '#b57291');
      my_gradient.addColorStop(randomNum(0.1, 0.3), '#a32a66');
      my_gradient.addColorStop(randomNum(0.1, 0.3), '#ffd8fb');
      my_gradient.addColorStop(randomNum(0.3, 0.6), '#8a9233');
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.arc(this.x + Math.random() * 3, this.y - 5 + Math.random() * 3, r, 0, Math.PI);
      ctx.fillStyle = my_gradient;
      ctx.closePath();
      ctx.fill();
    }
  },
  die() {
    if (this.radius < 0.05) {
      branchSet.remove(this);
    }
  },
  branch() {
    if (this.nowLength >= this.length) {
      // 主分支
      const count = Math.random() - 0.5 > 0 ? 1 : 2;
      for (let i = 0; i < count; i++) {
        const topBranch = new springBranch();
        topBranch.x = this.x;
        topBranch.y = this.y;
        topBranch.generation += this.generation;
        topBranch.radius = this.radius * 0.7; //(1 / this.generation);
        topBranch.angle = this.angle + ((Math.random() * Math.PI) / 4 - Math.PI / 8);
        topBranch.raiseLength = topBranch.radius / 2;
        const symbol = Math.random() - 0.5 > 0 ? 1 : -1;
        const deflectionAngle = (Math.random() * Math.PI) / 10 + Math.PI / 10;
        branchSet.add(topBranch);
      }
      const topBranch = new springBranch();
      topBranch.x = this.x;
      topBranch.y = this.y;
      topBranch.generation += this.generation;
      topBranch.radius = this.radius * 0.7; //(1 / this.generation);
      topBranch.angle = this.angle + ((Math.random() * Math.PI) / 4 - Math.PI / 8);
      topBranch.raiseLength = topBranch.radius / 2;
      const symbol = Math.random() - 0.5 > 0 ? 1 : -1;
      const deflectionAngle = (Math.random() * Math.PI) / 10 + Math.PI / 10; //偏转角度
      //左分支
      const leftBranch = new springBranch();
      leftBranch.x =
        this.x +
        (0.3 * this.nowLength + symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.cos(Math.PI - this.angle);
      leftBranch.y =
        this.y +
        (0.3 * this.nowLength + symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.sin(this.angle);
      leftBranch.generation += this.generation;
      leftBranch.radius = this.radius * 0.6; //(1 / this.generation);
      leftBranch.angle = this.angle + deflectionAngle;
      leftBranch.raiseLength = leftBranch.radius / 2;
      leftBranch.length =
        this.length - 10 * this.generation > 0 ? this.length - 10 * this.generation : 10;
      //右分支
      const rightBranch = new springBranch();
      rightBranch.x =
        this.x -
        (0.3 * this.nowLength - symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.cos(this.angle);
      rightBranch.y =
        this.y +
        (0.3 * this.nowLength - symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.sin(this.angle);
      rightBranch.radius = this.radius * 0.6; //(1 / this.generation);
      rightBranch.angle = this.angle - deflectionAngle;
      rightBranch.raiseLength = rightBranch.radius / 2;
      rightBranch.generation += this.generation;
      rightBranch.length =
        this.length - 10 * this.generation > 0 ? this.length - 10 * this.generation : 10;
      branchSet.add(leftBranch);
      branchSet.add(rightBranch);
      branchSet.remove(this);
    }
  },
};
//夏季树
summerBranch.prototype = {
  start() {
    this.draw();
    this.grow();
    this.die();
    this.flower();
    this.branch();
  },
  draw() {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = this.fillStyle;
    ctx.shadowColor = this.shadowColor;
    ctx.shadowBlur = this.shadowBlur;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    // 通过在当前点画圆填充形成图形
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },
  grow() {
    this.x += this.raiseLength * Math.cos(this.angle);
    this.y -= this.raiseLength * Math.sin(this.angle);
    this.nowLength += this.raiseLength;
    // this.radius *= 1 - this.generation / 500;
    this.radius /= Math.pow(1.1, this.generation / 200);
    /* if (this.raiseLength > this.radius * 2) {
          this.raiseLength = this.radius * 2;
        } */
  },
  flower() {
    if (this.radius < 0.05) {
      var r = 2.5 + Math.random() * 2.5;
      let ctx = this.ctx;
      var my_gradient = ctx.createLinearGradient(0, 0, 0, 170);
      my_gradient.addColorStop(randomNum(0, 0.1), '#35740a');
      my_gradient.addColorStop(randomNum(0.1, 0.3), '#87c738');
      my_gradient.addColorStop(randomNum(0.1, 0.3), '#438e1a');
      my_gradient.addColorStop(randomNum(0.3, 0.6), '#398105');
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.arc(this.x + Math.random() * 3, this.y - 5 + Math.random() * 3, r, 0, Math.PI);
      ctx.fillStyle = my_gradient;
      ctx.closePath();
      ctx.fill();
    }
  },
  die() {
    if (this.radius < 0.05) {
      branchSet.remove(this);
    }
  },
  branch() {
    if (this.nowLength >= this.length) {
      // 主分支
      const count = Math.random() - 0.5 > 0 ? 1 : 2;
      for (let i = 0; i < count; i++) {
        const topBranch = new summerBranch();
        topBranch.x = this.x;
        topBranch.y = this.y;
        topBranch.generation += this.generation;
        topBranch.radius = this.radius * 0.7; //(1 / this.generation);
        topBranch.angle = this.angle + ((Math.random() * Math.PI) / 4 - Math.PI / 8);
        topBranch.raiseLength = topBranch.radius / 2;
        const symbol = Math.random() - 0.5 > 0 ? 1 : -1;
        const deflectionAngle = (Math.random() * Math.PI) / 10 + Math.PI / 10;
        branchSet.add(topBranch);
      }
      const topBranch = new summerBranch();
      topBranch.x = this.x;
      topBranch.y = this.y;
      topBranch.generation += this.generation;
      topBranch.radius = this.radius * 0.7; //(1 / this.generation);
      topBranch.angle = this.angle + ((Math.random() * Math.PI) / 4 - Math.PI / 8);
      topBranch.raiseLength = topBranch.radius / 2;
      const symbol = Math.random() - 0.5 > 0 ? 1 : -1;
      const deflectionAngle = (Math.random() * Math.PI) / 10 + Math.PI / 10; //偏转角度
      //左分支
      const leftBranch = new summerBranch();
      leftBranch.x =
        this.x +
        (0.3 * this.nowLength + symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.cos(Math.PI - this.angle);
      leftBranch.y =
        this.y +
        (0.3 * this.nowLength + symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.sin(this.angle);
      leftBranch.generation += this.generation;
      leftBranch.radius = this.radius * 0.6; //(1 / this.generation);
      leftBranch.angle = this.angle + deflectionAngle;
      leftBranch.raiseLength = leftBranch.radius / 2;
      leftBranch.length =
        this.length - 10 * this.generation > 0 ? this.length - 10 * this.generation : 10;
      //右分支
      const rightBranch = new summerBranch();
      rightBranch.x =
        this.x -
        (0.3 * this.nowLength - symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.cos(this.angle);
      rightBranch.y =
        this.y +
        (0.3 * this.nowLength - symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.sin(this.angle);
      rightBranch.radius = this.radius * 0.6; //(1 / this.generation);
      rightBranch.angle = this.angle - deflectionAngle;
      rightBranch.raiseLength = rightBranch.radius / 2;
      rightBranch.generation += this.generation;
      rightBranch.length =
        this.length - 10 * this.generation > 0 ? this.length - 10 * this.generation : 10;
      branchSet.add(leftBranch);
      branchSet.add(rightBranch);
      branchSet.remove(this);
    }
  },
};

//秋季树
autumnBranch.prototype = {
  start() {
    this.draw();
    this.grow();
    this.die();
    this.flower();
    this.branch();
  },
  draw() {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = this.fillStyle;
    ctx.shadowColor = this.shadowColor;
    ctx.shadowBlur = this.shadowBlur;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    // 通过在当前点画圆填充形成图形
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },
  grow() {
    this.x += this.raiseLength * Math.cos(this.angle);
    this.y -= this.raiseLength * Math.sin(this.angle);
    this.nowLength += this.raiseLength;
    // this.radius *= 1 - this.generation / 500;
    this.radius /= Math.pow(1.1, this.generation / 200);
    /* if (this.raiseLength > this.radius * 2) {
          this.raiseLength = this.radius * 2;
        } */
  },
  flower() {
    if (this.radius < 0.05) {
      var r = 2.5 + Math.random() * 2.5;
      let ctx = this.ctx;
      var my_gradient = ctx.createLinearGradient(0, 0, 0, 170);
      my_gradient.addColorStop(randomNum(0, 0.1), '#de3e02');
      my_gradient.addColorStop(randomNum(0.1, 0.3), '#deb670');
      my_gradient.addColorStop(randomNum(0.1, 0.3), '#f44d1d');
      my_gradient.addColorStop(randomNum(0.3, 0.6), '#ad4306');
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.arc(this.x + Math.random() * 3, this.y - 5 + Math.random() * 3, r, 0, Math.PI);
      ctx.fillStyle = my_gradient;
      ctx.closePath();
      ctx.fill();
    }
  },
  die() {
    if (this.radius < 0.05) {
      branchSet.remove(this);
    }
  },
  branch() {
    if (this.nowLength >= this.length) {
      // 主分支
      const count = Math.random() - 0.5 > 0 ? 1 : 2;
      for (let i = 0; i < count; i++) {
        const topBranch = new autumnBranch();
        topBranch.x = this.x;
        topBranch.y = this.y;
        topBranch.generation += this.generation;
        topBranch.radius = this.radius * 0.7; //(1 / this.generation);
        topBranch.angle = this.angle + ((Math.random() * Math.PI) / 4 - Math.PI / 8);
        topBranch.raiseLength = topBranch.radius / 2;
        const symbol = Math.random() - 0.5 > 0 ? 1 : -1;
        const deflectionAngle = (Math.random() * Math.PI) / 10 + Math.PI / 10;
        branchSet.add(topBranch);
      }
      const topBranch = new autumnBranch();
      topBranch.x = this.x;
      topBranch.y = this.y;
      topBranch.generation += this.generation;
      topBranch.radius = this.radius * 0.7; //(1 / this.generation);
      topBranch.angle = this.angle + ((Math.random() * Math.PI) / 4 - Math.PI / 8);
      topBranch.raiseLength = topBranch.radius / 2;
      const symbol = Math.random() - 0.5 > 0 ? 1 : -1;
      const deflectionAngle = (Math.random() * Math.PI) / 10 + Math.PI / 10; //偏转角度
      //左分支
      const leftBranch = new autumnBranch();
      leftBranch.x =
        this.x +
        (0.3 * this.nowLength + symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.cos(Math.PI - this.angle);
      leftBranch.y =
        this.y +
        (0.3 * this.nowLength + symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.sin(this.angle);
      leftBranch.generation += this.generation;
      leftBranch.radius = this.radius * 0.6; //(1 / this.generation);
      leftBranch.angle = this.angle + deflectionAngle;
      leftBranch.raiseLength = leftBranch.radius / 2;
      leftBranch.length =
        this.length - 10 * this.generation > 0 ? this.length - 10 * this.generation : 10;
      //右分支
      const rightBranch = new autumnBranch();
      rightBranch.x =
        this.x -
        (0.3 * this.nowLength - symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.cos(this.angle);
      rightBranch.y =
        this.y +
        (0.3 * this.nowLength - symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.sin(this.angle);
      rightBranch.radius = this.radius * 0.6; //(1 / this.generation);
      rightBranch.angle = this.angle - deflectionAngle;
      rightBranch.raiseLength = rightBranch.radius / 2;
      rightBranch.generation += this.generation;
      rightBranch.length =
        this.length - 10 * this.generation > 0 ? this.length - 10 * this.generation : 10;
      branchSet.add(leftBranch);
      branchSet.add(rightBranch);
      branchSet.remove(this);
    }
  },
};
//冬季树
winterBranch.prototype = {
  start() {
    this.draw();
    this.grow();
    this.die();
    this.flower();
    this.branch();
  },
  draw() {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = this.fillStyle;
    ctx.shadowColor = this.shadowColor;
    ctx.shadowBlur = this.shadowBlur;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    // 通过在当前点画圆填充形成图形
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },
  grow() {
    this.x += this.raiseLength * Math.cos(this.angle);
    this.y -= this.raiseLength * Math.sin(this.angle);
    this.nowLength += this.raiseLength;
    // this.radius *= 1 - this.generation / 500;
    this.radius /= Math.pow(1.1, this.generation / 200);
    /* if (this.raiseLength > this.radius * 2) {
          this.raiseLength = this.radius * 2;
        } */
  },
  die() {
    if (this.radius < 0.05) {
      branchSet.remove(this);
    }
  },
  flower() {
    if (this.radius < 0.05) {
      var r = 2.5 + Math.random() * 2.5;
      let ctx = this.ctx;
      var my_gradient = ctx.createLinearGradient(0, 0, 0, 170);
      my_gradient.addColorStop(randomNum(0, 0.1), '#d1ceca');
      my_gradient.addColorStop(randomNum(0.1, 0.3), '#ffffff');
      my_gradient.addColorStop(randomNum(0.1, 0.3), '#cfcac9');
      my_gradient.addColorStop(randomNum(0.3, 0.6), '#ccd6e6');
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.arc(this.x + Math.random() * 3, this.y - 5 + Math.random() * 3, r, 0, Math.PI);
      ctx.fillStyle = my_gradient;
      ctx.closePath();
      ctx.fill();
    }
  },
  branch() {
    if (this.nowLength >= this.length) {
      // 主分支
      const count = Math.random() - 0.5 > 0 ? 1 : 2;
      for (let i = 0; i < count; i++) {
        const topBranch = new winterBranch();
        topBranch.x = this.x;
        topBranch.y = this.y;
        topBranch.generation += this.generation;
        topBranch.radius = this.radius * 0.7; //(1 / this.generation);
        topBranch.angle = this.angle + ((Math.random() * Math.PI) / 4 - Math.PI / 8);
        topBranch.raiseLength = topBranch.radius / 2;
        const symbol = Math.random() - 0.5 > 0 ? 1 : -1;
        const deflectionAngle = (Math.random() * Math.PI) / 10 + Math.PI / 10;
        branchSet.add(topBranch);
      }
      const topBranch = new winterBranch();
      topBranch.x = this.x;
      topBranch.y = this.y;
      topBranch.generation += this.generation;
      topBranch.radius = this.radius * 0.7; //(1 / this.generation);
      topBranch.angle = this.angle + ((Math.random() * Math.PI) / 4 - Math.PI / 8);
      topBranch.raiseLength = topBranch.radius / 2;
      const symbol = Math.random() - 0.5 > 0 ? 1 : -1;
      const deflectionAngle = (Math.random() * Math.PI) / 10 + Math.PI / 10; //偏转角度
      //左分支
      const leftBranch = new winterBranch();
      leftBranch.x =
        this.x +
        (0.3 * this.nowLength + symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.cos(Math.PI - this.angle);
      leftBranch.y =
        this.y +
        (0.3 * this.nowLength + symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.sin(this.angle);
      leftBranch.generation += this.generation;
      leftBranch.radius = this.radius * 0.6; //(1 / this.generation);
      leftBranch.angle = this.angle + deflectionAngle;
      leftBranch.raiseLength = leftBranch.radius / 2;
      leftBranch.length =
        this.length - 10 * this.generation > 0 ? this.length - 10 * this.generation : 10;
      //右分支
      const rightBranch = new winterBranch();
      rightBranch.x =
        this.x -
        (0.3 * this.nowLength - symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.cos(this.angle);
      rightBranch.y =
        this.y +
        (0.3 * this.nowLength - symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.sin(this.angle);
      rightBranch.radius = this.radius * 0.6; //(1 / this.generation);
      rightBranch.angle = this.angle - deflectionAngle;
      rightBranch.raiseLength = rightBranch.radius / 2;
      rightBranch.generation += this.generation;
      rightBranch.length =
        this.length - 10 * this.generation > 0 ? this.length - 10 * this.generation : 10;
      branchSet.add(leftBranch);
      branchSet.add(rightBranch);
      branchSet.remove(this);
    }
  },
};
//夜晚荧光树
nightBranch.prototype = {
  start() {
    this.draw();
    this.grow();
    this.die();
    this.branch();
  },
  draw() {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = this.fillStyle;
    ctx.shadowColor = this.shadowColor;
    ctx.shadowBlur = this.shadowBlur;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    // 通过在当前点画圆填充形成图形
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },
  grow() {
    this.x += this.raiseLength * Math.cos(this.angle);
    this.y -= this.raiseLength * Math.sin(this.angle);
    this.nowLength += this.raiseLength;
    // this.radius *= 1 - this.generation / 500;
    this.radius /= Math.pow(1.1, this.generation / 200);
    /* if (this.raiseLength > this.radius * 2) {
          this.raiseLength = this.radius * 2;
        } */
  },
  die() {
    if (this.radius < 0.05) {
      branchSet.remove(this);
    }
  },
  branch() {
    if (this.nowLength >= this.length) {
      // 主分支
      const count = Math.random() - 0.5 > 0 ? 1 : 2;
      for (let i = 0; i < count; i++) {
        const topBranch = new nightBranch();
        topBranch.x = this.x;
        topBranch.y = this.y;
        topBranch.generation += this.generation;
        topBranch.radius = this.radius * 0.7; //(1 / this.generation);
        topBranch.angle = this.angle + ((Math.random() * Math.PI) / 4 - Math.PI / 8);
        topBranch.raiseLength = topBranch.radius / 2;
        const symbol = Math.random() - 0.5 > 0 ? 1 : -1;
        const deflectionAngle = (Math.random() * Math.PI) / 10 + Math.PI / 10;
        branchSet.add(topBranch);
      }
      const topBranch = new nightBranch();
      topBranch.x = this.x;
      topBranch.y = this.y;
      topBranch.generation += this.generation;
      topBranch.radius = this.radius * 0.7; //(1 / this.generation);
      topBranch.angle = this.angle + ((Math.random() * Math.PI) / 4 - Math.PI / 8);
      topBranch.raiseLength = topBranch.radius / 2;
      const symbol = Math.random() - 0.5 > 0 ? 1 : -1;
      const deflectionAngle = (Math.random() * Math.PI) / 10 + Math.PI / 10; //偏转角度
      //左分支
      const leftBranch = new nightBranch();
      leftBranch.x =
        this.x +
        (0.3 * this.nowLength + symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.cos(Math.PI - this.angle);
      leftBranch.y =
        this.y +
        (0.3 * this.nowLength + symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.sin(this.angle);
      leftBranch.generation += this.generation;
      leftBranch.radius = this.radius * 0.6; //(1 / this.generation);
      leftBranch.angle = this.angle + deflectionAngle;
      leftBranch.raiseLength = leftBranch.radius / 2;
      leftBranch.length =
        this.length - 10 * this.generation > 0 ? this.length - 10 * this.generation : 10;
      //右分支
      const rightBranch = new nightBranch();
      rightBranch.x =
        this.x -
        (0.3 * this.nowLength - symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.cos(this.angle);
      rightBranch.y =
        this.y +
        (0.3 * this.nowLength - symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.sin(this.angle);
      rightBranch.radius = this.radius * 0.6; //(1 / this.generation);
      rightBranch.angle = this.angle - deflectionAngle;
      rightBranch.raiseLength = rightBranch.radius / 2;
      rightBranch.generation += this.generation;
      rightBranch.length =
        this.length - 10 * this.generation > 0 ? this.length - 10 * this.generation : 10;
      branchSet.add(leftBranch);
      branchSet.add(rightBranch);
      branchSet.remove(this);
    }
  },
};

function Branch() {
  this.x = initX;
  this.y = initY;
  this.ctx = canvas.getContext('2d');
  this.radius = 5;
  this.angle = Math.PI / 2;
  this.rate = Math.tan(this.angle);

  this.fillStyle = '#000'; //树枝颜色
  this.shadowColor = '#000'; //树枝阴影颜色
  this.shadowBlur = 2; //树枝阴影模糊度

  this.length = Math.random() * 60 + 60; //树枝长度
  this.nowLength = 0; //当前长度
  this.generation = 1; //代
  this.raiseLength = this.radius; //每次增长长度
}
Branch.prototype = {
  start() {
    this.draw();
    this.grow();
    this.die();
    this.branch();
  },

  draw() {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = this.fillStyle;
    ctx.shadowColor = this.shadowColor;
    ctx.shadowBlur = this.shadowBlur;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    // 通过在当前点画圆填充形成图形
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },

  grow() {
    this.x += this.raiseLength * Math.cos(this.angle);
    this.y -= this.raiseLength * Math.sin(this.angle);
    this.nowLength += this.raiseLength;
    // this.radius *= 1 - this.generation / 500;
    this.radius /= Math.pow(1.1, this.generation / 200);

    /* if (this.raiseLength > this.radius * 2) {
          this.raiseLength = this.radius * 2;
        } */
  },

  die() {
    if (this.radius < 0.1) {
      branchSet.remove(this);
    }
  },

  branch() {
    if (this.nowLength >= this.length) {
      // 主分支
      const count = Math.random() - 0.5 > 0 ? 1 : 2;
      for (let i = 0; i < count; i++) {
        const topBranch = new Branch();
        topBranch.x = this.x;
        topBranch.y = this.y;
        topBranch.generation += this.generation;

        topBranch.radius = this.radius * 0.7; //(1 / this.generation);
        topBranch.angle = this.angle + ((Math.random() * Math.PI) / 4 - Math.PI / 8);
        topBranch.raiseLength = topBranch.radius / 2;

        const symbol = Math.random() - 0.5 > 0 ? 1 : -1;
        const deflectionAngle = (Math.random() * Math.PI) / 10 + Math.PI / 10;
        branchSet.add(topBranch);
      }
      const topBranch = new Branch();
      topBranch.x = this.x;
      topBranch.y = this.y;
      topBranch.generation += this.generation;
      topBranch.radius = this.radius * 0.7; //(1 / this.generation);
      topBranch.angle = this.angle + ((Math.random() * Math.PI) / 4 - Math.PI / 8);
      topBranch.raiseLength = topBranch.radius / 2;

      const symbol = Math.random() - 0.5 > 0 ? 1 : -1;
      const deflectionAngle = (Math.random() * Math.PI) / 10 + Math.PI / 10; //偏转角度

      //左分支
      const leftBranch = new Branch();
      leftBranch.x =
        this.x +
        (0.3 * this.nowLength + symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.cos(Math.PI - this.angle);
      leftBranch.y =
        this.y +
        (0.3 * this.nowLength + symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.sin(this.angle);
      leftBranch.generation += this.generation;
      leftBranch.radius = this.radius * 0.6; //(1 / this.generation);
      leftBranch.angle = this.angle + deflectionAngle;
      leftBranch.raiseLength = leftBranch.radius / 2;
      leftBranch.length =
        this.length - 10 * this.generation > 0 ? this.length - 10 * this.generation : 10;

      //右分支
      const rightBranch = new Branch();
      rightBranch.x =
        this.x -
        (0.3 * this.nowLength - symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.cos(this.angle);
      rightBranch.y =
        this.y +
        (0.3 * this.nowLength - symbol * (this.nowLength * (Math.random() / 10 + 0.1))) *
          Math.sin(this.angle);

      rightBranch.radius = this.radius * 0.6; //(1 / this.generation);
      rightBranch.angle = this.angle - deflectionAngle;
      rightBranch.raiseLength = rightBranch.radius / 2;
      rightBranch.generation += this.generation;
      rightBranch.length =
        this.length - 10 * this.generation > 0 ? this.length - 10 * this.generation : 10;

      branchSet.add(leftBranch);
      branchSet.add(rightBranch);
      branchSet.remove(this);
    }
  },
};

const branchSet = {
  branches: [], //保存树枝的数组

  // 添加树枝的方法
  add(branch) {
    this.branches.push(branch);
  },

  // 移除树枝的方法
  remove(branch) {
    /* for (let index in this.branches) {
        if (this.branches[index] === branch) this.branches.splice(index, 1);
      } */

    const index = this.branches.indexOf(branch);
    this.branches.splice(index, 1);

    //停止生长音乐播放
    if (this.branches.length == 0) {
      let growMusic = document.getElementById('growMusic');
      growMusic.pause();
    }
  },

  // 调用每个树枝对象的开始方法
  start() {
    for (let index in this.branches) {
      this.branches[index].start();
    }
  },
};
