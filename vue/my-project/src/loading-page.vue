<template>
  <canvas
    id="tutorial"
    width="200"
    height="200"
  >
    本浏览器暂不支持画布
  </canvas>
</template>

<script>
export default {
  name: 'loading-page',
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const canvas = document.getElementById('tutorial');
      if (!canvas.getContext) return;
      const ctx = canvas.getContext('2d');
      // 原生canvas中 只提供了矩形一种原生图形 其余的  至少需要绘制一条路径 ===> 复杂图形的基础

      // ctx.fillStyle = 'rgb(200.0,0)';
      // 绘制填充的矩形
      // ctx.fillRect(10, 10, 55, 50); //坐标 10*10  长55 宽50

      // ctx.fillStyle = 'rgba(0,0,200,.5)';
      //绘制矩形边框
      // ctx.strokeRect(30, 30, 55, 50);

      // 清除 10,10 位置的  55*55 的矩形区域 （ 类似于画板的橡皮擦 ）
      // ctx.clearRect(10, 10, 55, 55);

      // 绘制一个空心矩形
      // ctx.fillRect(25, 25, 100, 100);
      // ctx.clearRect(45, 45, 60, 60);
      // ctx.strokeRect(50, 50, 50, 50);

      // 绘制三角形
      // 创建一条路径
      // lineTo(x, y)  绘制一条从当前位置到指定x以及y位置的直线。
      // ctx.beginPath(); //起始一条路径，或重置当前路径
      // //moveTo 移动笔触  落笔点从原点移动到新位置  但是此时没落笔  不创建线条
      // ctx.moveTo(50, 50); //把路径移动到画布中的指定点，不创建线条
      // ctx.lineTo(150, 50); //从起点 上面的坐标  到  现在括号中的坐标划线
      // ctx.lineTo(100, 150);
      // // ctx.lineTo(50, 50); //画到起点 === ctx.closePath() 的作用
      // // ctx.stroke(); //绘制边框 非填充
      // ctx.fill(); //使用 fill(填充)时  不必封闭曲线 它会自动封闭

      // 绘制笑脸
      // ctx.beginPath(); //创建一条路径
      // ctx.arc(75, 75, 50, 0, 2 * Math.PI, true); //从（75,75）开始绘制 报警为50的圆 从0=>2π（一周） False = 顺时针，true = 逆时针
      // ctx.moveTo(110, 75); //移动笔触
      // ctx.arc(75, 75, 35, 0, Math.PI, false); //绘制嘴部分 75,75为原点 35为半径 半绘制圆 顺时针
      // ctx.moveTo(65, 65); //移动笔触
      // ctx.arc(60, 65, 5, 0, Math.PI * 2, true); //左眼
      // ctx.moveTo(95, 65);
      // ctx.arc(90, 65, 5, 0, Math.PI * 2, true);
      // ctx.stroke(); //封闭曲

      // 二次贝塞尔曲线 --- 对话框
      // ctx.beginPath();
      // ctx.moveTo(75, 25);
      // // quadraticCurveTo 二次贝塞尔曲线  一当前落笔点为开始 控制点 a，b  结束点 x，y进行绘制
      // ctx.quadraticCurveTo(25, 25, 25, 62.5);
      // ctx.quadraticCurveTo(25, 100, 50, 100);
      // ctx.quadraticCurveTo(50, 120, 30, 125);
      // ctx.quadraticCurveTo(65, 125, 65, 100);
      // ctx.quadraticCurveTo(125, 100, 125, 62.5);
      // ctx.quadraticCurveTo(125, 25, 75, 25);
      // ctx.stroke();

      // 三次贝塞尔曲线 --- 填充心形
      // ctx.beginPath();
      // ctx.moveTo(75, 40);
      // ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
      // ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
      // ctx.bezierCurveTo(20, 90, 40, 102, 75, 120);
      // ctx.bezierCurveTo(110, 110, 130, 80, 130, 62.5);
      // ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
      // ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
      // // ctx.fill();
      // ctx.stroke();

      // 封装的 曲边 矩形
      // this.roundedRect(ctx, 12, 12, 150, 150, 15);
    },
    // 绘制 曲边矩形的方法
    roundedRect(ctx, x, y, width, height, radius) {
      ctx.beginPath();
      ctx.moveTo(x, y + radius);
      ctx.lineTo(x, y + height - radius);
      ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
      ctx.lineTo(x + width - radius, y + height);
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width,
        y + height - radius
      );
      ctx.lineTo(x + width, y + radius);
      ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
      ctx.lineTo(x + radius, y);
      ctx.quadraticCurveTo(x, y, x, y + radius);
      ctx.stroke();
    },
    /**
     * 绘制一条曲线路径
     * @param  {Object} ctx canvas渲染上下文
     * @param  {Array<number>} start 起点
     * @param  {Array<number>} end 终点
     * @param  {number} curveness 曲度(0-1)
     */
    drawCurvePath(ctx, start, end, curveness) {
      // 计算中间控制点
      var cp = [
        (start[0] + end[0]) / 2 - (start[1] - end[1]) * curveness,
        (start[1] + end[1]) / 2 - (end[0] - start[0]) * curveness
      ];
      ctx.moveTo(start[0], start[1]);
      ctx.quadraticCurveTo(cp[0], cp[1], end[0], end[1]);
    }
  }
};
</script>

<style>
canvas {
  border: 1px solid black;
}
</style>
