const container = new Vue({
  el: '#container',
  data: {
    fontArr: ['春', '夏', '秋', '冬', '黑'], //主题名字
    imgArr1: [
      './pictures/spring1.png',
      './pictures/summer1.png',
      './pictures/autumn1.png',
      './pictures/winter1.png',
      './pictures/black1.png',
    ], //背景图片
    musicArr: [
      './musics/spring1.mp3',
      './musics/summer1.wav',
      './musics/autumn1.wav',
      './musics/winter1.wav',
      './musics/night1.wav',
    ], //背景音乐
    imgArr2: [
      './pictures/spring.gif',
      './pictures/summer.gif',
      './pictures/autumn.gif',
      './pictures/winter.gif',
      './pictures/black.gif',
    ], //春夏秋冬顶部导航图片
    fontColors: [
      'rgba(255, 255, 255, 1)',
      'rgba(50, 188, 187, 1)',
      'rgb(202, 136, 89)',
      'rgb(89, 89, 89)',
      'rgb(255,255,255)',
    ], //春夏秋冬字体颜色
    btnColors: [
      'rgba(255, 255, 255, 1)',
      'rgba(255, 255, 255, 1)',
      'rgba(255, 255, 255, 1)',
      'rgba(218, 218, 218, 1)',
      'rgb(255,255,255)',
    ], //切换的按钮的颜色
    index: 0,
    n: 0,
  },
  watch: {
    index(value) {
      if (value === 4) {
        setTimeout(() => {
          Dot('dot', {
            cW: width,
            cH: height,
          });
        }, 0);
      }
    },
  },
  methods: {
    handleCanvas(e) {
      initX = e.clientX;
      initHeight = e.clientY;
      if (container.n == 0) {
        // console.log(container.n);
        branch = new springBranch();
      } else if (container.n == 1) {
        // console.log(container.n);
        branch = new summerBranch();
      } else if (container.n == 2) {
        // console.log(container.n);
        branch = new autumnBranch();
      } else if (container.n == 3) {
        // console.log(container.n);
        branch = new winterBranch();
      } else {
        // console.log(container.n);
        branch = new nightBranch();
      }

      branchSet.add(branch);
      canvas.style = 'pointer-events:none';
      // 定义并添加最初始的树枝

      // 启动进程
      branchSet.start();

      //播放生长音乐
      let growMusic = document.getElementById('growMusic');
      let a = document.getElementById('backgroundMusic');
      a.play();
      growMusic.play();

      // 制作动画效果
      const timeId = setInterval(function () {
        branchSet.start();
        if (branchSet.branches.length === 0) {
          clearInterval(timeId);
          canvas.style = 'pointer-events:click';
        }
      }, 4);
    },

    next() {
      if (branchSet.branches.length) {
        return;
      }
      if (this.index == this.imgArr1.length - 1) {
        this.index = 0;
      } else {
        this.index++;
      }
      if (this.index == 0) {
        this.n = 0;
      } else if (this.index == 1) {
        this.n = 1;
      } else if (this.index == 2) {
        this.n = 2;
      } else if (this.index == 3) {
        this.n = 3;
      } else {
        this.n = 4;
      }
      this.clearCanvas();
    },
    prev() {
      if (branchSet.branches.length) {
        return;
      }
      if (this.index == 0) {
        this.index = this.imgArr1.length - 1;
      } else {
        this.index--;
      }
      if (this.index == 0) {
        this.n = 0;
      } else if (this.index == 1) {
        this.n = 1;
      } else if (this.index == 2) {
        this.n = 2;
      } else if (this.index == 3) {
        this.n = 3;
      } else {
        this.n = 4;
      }
      this.clearCanvas();
    },
    clearCanvas: function () {
      canvas.style = 'pointer-events:click';
      branchSet.branches = [];
      const c = document.getElementById('tree');
      // let c = this.$refs.tree;
      const ctx = c.getContext('2d');
      ctx.clearRect(0, 0, c.width, c.height);
    },
  },
});

const canvas = document.getElementById('tree');
const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;
let initX;
const initY = height;
let initRadius;
let colorArr = [
  '#d5403c',
  '#f8da70',
  '#663181',
  '#f899a4',
  '#fca74d',
  '#90b951',
  '#308f93',
  '#428c35',
];
let color;
const tree = document.getElementById('tree');
tree.onclick = function () {
  color = Math.floor(Math.random() * 8);
};
window.onresize = function () {
  location.reload();
};

function radiusType(percentage) {
  switch (true) {
    case 0 < percentage && percentage < 0.2:
      return Math.random() * (7 - 5 + 1) + 5;
      break;
    case 0.2 <= percentage && percentage < 0.7:
      return Math.random() * (6.5 - 4 + 1) + 4;
      break;
    case 0.7 <= percentage && percentage < 1.0:
      return Math.random() * (4 - 2 + 1) + 2;
      break;
    default:
      return 5;
      break;
  }
}
