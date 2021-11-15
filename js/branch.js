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
        if (this.radius < 0.05) {
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
