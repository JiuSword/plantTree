const app = new Vue({
  el: '#container',
  data: {
    isShow: false,
    startBackground: '',
    aboutBackground: '',
    pointColor: '',
  },
  methods: {
    changeColor1() {
      this.startBackground = 'rgba(115, 115, 115, 1)';
    },
    changeColor2() {
      this.startBackground = '';
    },
    changeColor3() {
      this.aboutBackground = 'rgba(215, 215, 215, 1)';
      this.pointColor = 'rgba(0, 0, 0, 1)';
    },
    changeColor4() {
      this.aboutBackground = '';
      this.pointColor = '';
    },
    open() {
      this.isShow = true;
    },
    close() {
      this.isShow = false;
    },
  },
});
