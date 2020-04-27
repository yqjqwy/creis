<template>
  <div id="containerBox">
    <div id="container"></div>
  </div>
</template>

<script>
import Konva from 'konva';

export default {
  data() {
    return {
      // canvas 实例
      canvasStage: null,
      // 矩阵单元格实例
      rectItemArr: [],
      // 根据滑过图例筛选出对应的矩阵单元
      filtrerRectItem: [],
      // 当前选中的图例名称
      selectLegnedName: [],
      // 数据源备份
      copyData: {},
      // canvas 数据结构
      canvasData: {
        // 顶部标题
        title: {
          // 中指地主基于经济水平、人口潜力、市场表现等指标体系,对所选的40个城市进行对比分析，提供策略建议如下：
          value: '',
          color: 'black'
        },
        color: [
          '#1176b7',
          '#2596d0',
          '#f96226',
          '#fd8421',
          '#fbb733',
          '#ffdb43'
        ],
        legend: [
          {
            // 左上 --- 标题
            title: {
              value: '第一梯队',
              color: 'red'
            },
            // 文本
            text: {
              value:
                '多为区域中心城市或经济发达、人口规模大的地级市，经济水平居住居城市群前列，且保持中高速增长，自身禅意基础好，产业机构不断提升，居民购买力较强，交通便捷度高 ，多数城市高铁网络发达，获奖收到高铁开通利好。房价地价水平仍然有上升空间，市场容量大，土地供应规模较大，市场潜力突出，建议重点进入。',
              color: 'black'
            },
            // 线框颜色
            rectColor: 'red'
          },
          {
            // 右上 标题
            title: {
              value: '第二梯队',
              color: 'red'
            },
            // 文本
            text: {
              value:
                '区域中心城市，经济发达，交通通达性高，产业发达，就业机会多，人口吸引力强，需求旺盛。房地产市场法阵成熟，地价。房价水平均居城市群前列，总价门槛高，土地市场竞争激烈，利润空间受到亚索，建议择机进入。',
              color: 'black'
            },
            rectColor: 'black'
          },
          {
            // 左下 --- 标题
            title: {
              value: '第三梯队',
              color: 'red'
            },
            // 文本
            text: {
              value:
                '经济、人口、产业等部分要素存在一定的短板，交通通达性一般，部分城市高铁从无到有，规划利好成都较高，城市市场规模中等，市场政策相对宽松，可做关注。',
              color: 'black'
            },
            rectColor: 'red'
          },
          {
            // 右下 --- 标题
            title: {
              value: '第四梯队',
              color: 'red'
            },
            // 文本
            text: {
              value:
                '经济水平较差，产业基础薄弱，产业结构任然以第二产业为主，对外交通通达性弱，未来高铁规划线路少，人口基数小，且为人口流出型城市，居民购买力弱，对房地产市场制支撑能力弱，目前市场规模小，土地供应有限。',
              color: 'black'
            },
            rectColor: 'black'
          }
        ],
        // 顶部标题
        topTitle: {
          backgroundColor: '#99CCFF', //背景色
          color: 'black', // 字体颜色
          value: '市场空间'
        },
        // 左侧标题
        leftTitle: {
          backgroundColor: '#99CCFF', //背景色
          color: 'black', // 字体颜色
          value: '投资价值'
        },
        // 中心内容区
        series: [
          {
            backgroundColor: '#fff', //背景色
            isBetweenLoR: true, //是否区分左右
            // 左侧的文案
            leftText: {
              value: '高',
              color: 'black' //字体颜色
            },
            left: {
              backgroundColor: 'red', //背景色
              value: [
                '南京，宁波，合肥，无锡',
                '南通，常州,合肥，无锡',
                '南京，宁波，合肥，无锡'
              ],
              // 顶部 标题
              topTitle: {
                value: '高',
                color: 'black'
              },
              color: '#fff' //字体颜色
            },
            right: {
              backgroundColor: 'black', //背景色
              value: ['杭州'],
              // 顶部 标题
              topTitle: {
                value: '低',
                color: 'black'
              },
              color: '#fff' //字体颜色
            }
          },
          {
            backgroundColor: '#FFCC99', //背景色
            isBetweenLoR: false, //是否区分左右
            // 左侧的文案
            leftText: {
              value: '中',
              color: 'black' //字体颜色
            },
            value: [
              '台州、绍兴、金华、盐城',
              '湖州、扬州、镇江、芜湖',
              '台州、舟山、马鞍山、赣州',
              '台州、绍兴、金华、盐城',
              '湖州、扬州、镇江、芜湖',
              '台州、舟山、马鞍山、赣州'
            ],
            color: '#fff'
          },
          {
            backgroundColor: '#CCCCCC', //背景色
            isBetweenLoR: false, //是否区分左右
            // 左侧的文案
            leftText: {
              value: '低',
              color: 'black' //字体颜色
            },
            value: ['宜城、安庆、铜陵、池州'],
            color: '#fff'
          }
        ]
      },
      sumHeight: 0, //总高度
      sumleftHeight: 0, //左侧总高度
      sumrightHeight: 0, //右侧总高度
      // 间距宽高
      intervalX: 0,
      intervalY: 0,
      // 中间内容区的宽高
      totalWidth: 0,
      totalHeight: 0,
      // 根据 下标 将生成的 series 矩阵  重新保存  {0:{}}
      saveSeriesRect: {},
      // 根据下标 将生成的 图例矩阵 保存
      saveLegendRect: {}
    };
  },
  watch: {
    canvasData() {
      // 初始化
      this.init();
    }
  },
  mounted() {
    // 初始化
    this.init();
  },
  beforeDestroy() {
    //销毁实例
    this.destoryStage();
  },
  methods: {
    /**
     * 初始化
     * * */
    init() {
      const self = this;
      //备份数据源
      self.copyData = self.deepClone(self.canvasData);
      this.revertCanvas(self.canvasData);
    },
    /**
     * 深度拷贝
     * * */
    deepClone(obj) {
      const self = this;
      const objClone = Array.isArray(obj) ? [] : {};
      if (obj && typeof obj === 'object') {
        for (let key in obj) {
          if (obj[key]) {
            //判断ojb子元素是否为对象，如果是，递归复制
            if (obj[key] && typeof obj[key] === 'object') {
              objClone[key] = self.deepClone(obj[key]);
            } else {
              //如果不是，简单复制
              objClone[key] = obj[key];
            }
          }
        }
      }
      return objClone;
    },
    /***
     * 销毁实例
     * * */
    destoryStage() {
      const self = this;
      //销毁实例
      if (self.canvasStage) {
        self.canvasStage.destroy();
        self.canvasStage = null;
      }
    },
    /***
     * 重置
     * * */
    revertCanvas(data) {
      const self = this;
      //销毁实例
      self.destoryStage();
      //备份数据源
      self.createMoreRect(data);
    },
    /**
     * 生成多个矩形
     * @param { Object } dataObj 数据源
     * 左中右  22:56:22
     * * */
    createMoreRect(dataObj) {
      const self = this;
      const canvasDataObj = self.deepClone(dataObj);
      const canvasDom = document.getElementById('container');
      // 当前容器宽高
      const boxWidth = canvasDom.offsetWidth;
      const boxHeight = canvasDom.offsetHeight;
      // 间距宽高
      self.intervalX = 0.01 * boxWidth; //横向间隔
      self.intervalY = 0.01 * boxHeight; //纵向间隔
      // 中间内容区的宽高
      self.totalWidth = boxWidth - 2 * self.intervalX;
      self.totalHeight = boxHeight - 2 * self.intervalY;

      // 创建舞台
      const stage =
        self.canvasStage ||
        new Konva.Stage({
          container: canvasDom,
          width: boxWidth, //window.innerWidth, //页面宽
          height: boxHeight //window.innerHeight //页面高
        });
      //保存实例
      self.canvasStage = stage;

      // 创建层
      const layer = new Konva.Layer();
      stage.add(layer);

      self.sumHeight = self.intervalY;

      // 绘制 顶部标题
      if (canvasDataObj.title && canvasDataObj.title.value) {
        // 矩阵内的文案
        const titleText = self.drawText(
          self.intervalX,
          self.intervalY,
          self.totalWidth,
          null,
          canvasDataObj.title.value || '--'
        );
        //设置垂直居中
        titleText.verticalAlign('middle');
        // 添加 矩形
        layer.add(titleText);
        // 累加 标题部分
        self.sumHeight += titleText.getHeight();
      }

      // 绘制 左上侧的图形
      canvasDataObj.legend.forEach((item, index) => {
        // 奇数
        if ((index + 1) % 2 !== 0) {
          self.sumleftHeight = self.sumleftHeight || self.sumHeight;
        } else {
          // 偶数行1
          self.sumrightHeight = self.sumrightHeight || self.sumHeight;
        }
        self.drawFourRect(index, canvasDataObj, layer);
      });

      // 绘制中部区域
      // 顶部标题
      if (canvasDataObj.topTitle) {
        // 绘制矩形
        const centerTopTitleText = self.drawText(
          self.totalWidth * 0.36,
          self.intervalY + self.sumHeight + 0.05 * self.totalHeight,
          self.totalWidth * 0.4,
          null,
          canvasDataObj.topTitle.value || '--',
          canvasDataObj.topTitle.color
        );
        //设置垂直居中
        centerTopTitleText.verticalAlign('middle');

        const centerTopTitleRect = self.drawRect(
          self.totalWidth * 0.36,
          self.intervalY + self.sumHeight + 0.05 * self.totalHeight,
          self.totalWidth * 0.4,
          centerTopTitleText.getHeight(),
          canvasDataObj.topTitle.backgroundColor,
          null,
          canvasDataObj.topTitle.backgroundColor
        );
        // 添加 标题矩形
        layer.add(centerTopTitleRect);
        // 添加 标题文案
        layer.add(centerTopTitleText);
        // 累加总高度 保存
        self.sumHeight += self.intervalY + centerTopTitleRect.getHeight();
      }

      // 绘制中心区域
      self.drawCenterData(canvasDataObj, layer);

      // 根据图例  进行画线
      const legendArrs = self.saveLegendRect;
      if (legendArrs && Object.keys(legendArrs).length) {
        Object.keys(legendArrs).forEach((item, index) => {
          const theItem = self.saveLegendRect[index]; //图例的对象
          const seriesObj = self.saveSeriesRect[index]; //中心区域  对应的 矩阵的对象
          //   奇数向左 欧属性向右
          // 奇数
          if ((index + 1) % 2 !== 0) {
            //获取 线的起点位置 --- 以图例为起点
            self.drawLinePoints(theItem, seriesObj, layer, 'left');
          } else {
            // 偶数行 --- 以 矩阵为起点
            self.drawLinePoints(seriesObj, theItem, layer, 'right');
          }
        });
      }

      //绘制图层
      layer.draw(); //绘制图层--矩 阵
    },
    /**
     * 根据传入的对象 画线
     * @param { Object } obj1 矩阵对象/图例对象
     * @param { Object } obj2 矩阵对象/图例对象
     * @param { Object } layer 图层对象
     * @param { String } type 类型 left/right 箭头向右、向左
     * */
    drawLinePoints(obj1, obj2, layer, type) {
      const self = this;
      //获取 线的起点位置
      const lindStartX = obj1.getAttr('x') + obj1.getWidth();
      const lineStartY = obj1.getAttr('y') + obj1.getHeight() * 0.3;
      // 拐点
      const lineX1 = (obj2.getAttr('x') - lindStartX) / 2 + lindStartX;
      // 矩阵高度
      const rectY = obj2.getAttr('y') + obj2.getHeight() * 0.3;
      const line2 = obj2.getAttr('x');
      const points = [
        lindStartX + (type === 'left' ? 5 : 0),
        lineStartY,
        lineX1,
        lineStartY,
        lineX1,
        rectY,
        line2 - (type === 'left' ? 0 : 5),
        rectY
      ];
      //绘制 矩阵和 图例的关系线
      const xLayerLine = self.drawLine(0, 0, points, 1);
      layer.add(xLayerLine);
      //绘制箭头
      const thePointX = type === 'left' ? lindStartX : line2;
      const thePointY = type === 'left' ? lineStartY : rectY;
      const sText = self.drawText(
        thePointX,
        thePointY,
        null,
        null,
        type === 'left' ? '<' : '>',
        null,
        null,
        19
      );
      sText.setAttr(
        'x',
        sText.getAttr('x') - sText.getWidth() / 2 + (type === 'left' ? 5 : -5)
      );
      sText.setAttr('y', sText.getAttr('y') - sText.getHeight() / 2);
      layer.add(sText);
    },
    /**
     * 绘制中心区域
     * @param { Object } canvasDataObj 数据源
     * @param { Object } layer 图层对象
     * */
    drawCenterData(canvasDataObj, layer) {
      const self = this;
      const theDataObj = canvasDataObj || {};
      const theDataArr = theDataObj.series || [];
      let getOtherAttr = {};
      if (theDataArr && theDataArr.length) {
        // 宽高
        const busX = self.totalWidth * 0.36;
        let busY = self.intervalY + self.sumHeight + 0.05 * self.totalHeight;
        // 画线的起始位置
        const lineInitX = self.totalWidth * 0.31;
        // 第一条线的Y
        const firstLineY = busY;
        // 最后一条线的Y
        let lastLineY = 0;
        // 向下平移 字体的高度
        let topTitleY = 0;
        // 保存的下标信息
        let theSaveIndex = -1;
        // 一条中间的数据 = 顶部虚线 + 虚线上的文案 + 区域矩形 + 区域文案
        theDataArr.forEach((item, index) => {
          let points = [];
          theSaveIndex += 1;
          // 判断是否需要分左右
          if (item.isBetweenLoR) {
            const leftWidth = self.totalWidth * 0.18;
            const leftY = busY + 2 * self.intervalY;
            // 左侧文案
            if (item.left.topTitle) {
              const leftTitleText = self.drawText(
                leftWidth / 2 + busX,
                leftY - self.intervalY,
                null,
                null,
                item.left.topTitle.value || '--',
                item.left.topTitle.color
              );
              layer.add(leftTitleText);
              topTitleY = leftTitleText.getHeight() + self.intervalY;
            }
            // 线坐标信息
            points = [
              lineInitX,
              busY + topTitleY + self.intervalY,
              self.totalWidth * 0.76 + self.intervalX,
              busY + topTitleY + self.intervalY
            ];

            getOtherAttr = self.drawRectText(
              busX,
              leftY + topTitleY,
              self.totalWidth * 0.18,
              null,
              item.left,
              layer,
              theSaveIndex
            );
            // 右侧文案
            const rightX =
              getOtherAttr.x + 3 * self.intervalX + getOtherAttr.width;
            const rightWidth = self.totalWidth * 0.19;
            if (item.right.topTitle) {
              const leftTitleText = self.drawText(
                rightWidth / 2 + rightX,
                leftY - self.intervalY,
                null,
                null,
                item.right.topTitle.value || '--',
                item.right.topTitle.color
              );
              layer.add(leftTitleText);
              topTitleY = leftTitleText.getHeight() + self.intervalY;
            }
            theSaveIndex += 1;
            self.drawRectText(
              rightX,
              leftY + topTitleY,
              rightWidth,
              null,
              item.right,
              layer,
              theSaveIndex
            );
          } else {
            // 上方的线
            points = [
              lineInitX,
              getOtherAttr.y + getOtherAttr.height + self.intervalY,
              self.totalWidth * 0.76 + self.intervalX,
              getOtherAttr.y + getOtherAttr.height + self.intervalY
            ];
            // 文案+矩阵
            getOtherAttr = self.drawRectText(
              busX,
              getOtherAttr.y + getOtherAttr.height + 2 * self.intervalY,
              self.totalWidth * 0.4,
              null,
              item,
              layer,
              theSaveIndex
            );
          }

          // 绘制 线旁边的文案
          const lindRightText = self.drawText(
            lineInitX,
            getOtherAttr.y +
              parseInt(getOtherAttr.height / 2, 10) -
              self.intervalY,
            null,
            null,
            item.leftText.value || '--',
            item.leftText.color
          );
          layer.add(lindRightText);
          // 画线
          const xLayerLine = self.drawLine(0, 0, points, 0.5);
          layer.add(xLayerLine);

          // 判断是否是最后一条  如果是  那么 绘制封底的虚线
          if (index === theDataArr.length - 1) {
            //   保存 最后一条线的Y
            lastLineY =
              getOtherAttr.y + getOtherAttr.height + 2 * self.intervalY;
            // 画线
            points = [
              lineInitX,
              lastLineY,
              self.totalWidth * 0.76 + self.intervalX,
              lastLineY
            ];
            // 画线
            const xLayerLine = self.drawLine(0, 0, points, 0.5);
            layer.add(xLayerLine);
          }
        });

        // 绘制 左侧的标题信息
        const drawLeftTitle = self.drawText(
          0.24 * self.totalWidth,
          firstLineY + topTitleY,
          0.045 * self.totalHeight,
          lastLineY - firstLineY - topTitleY,
          theDataObj.leftTitle.value || '--',
          theDataObj.leftTitle.color,
          null,
          14
        );

        const drawLeftTitleRerct = self.drawRect(
          0.24 * self.totalWidth,
          firstLineY + topTitleY,
          0.045 * self.totalHeight,
          lastLineY - firstLineY - topTitleY,
          theDataObj.leftTitle.backgroundColor,
          null,
          theDataObj.leftTitle.backgroundColor
        );

        drawLeftTitle.verticalAlign('middle');

        //添加到图层
        layer.add(drawLeftTitleRerct);
        layer.add(drawLeftTitle);
      }
    },
    /**
     * 绘制矩形 + 矩形内的文案
     * @param { Number } x x轴
     * @param { Number } y y轴
     * @param { Number } width 宽度
     * @param { Number } height 高度
     * @param { Object } itemObj 数据对象
     * @param { Object } layer 图层对象
     * @param { Number } theSaveIndex 保存信息的下标
     * */
    drawRectText(...arg) {
      const self = this;
      const textVal = arg[4].value;
      let textValHeight = 0; //文案累加高度
      const textValCon = []; //文案的对象存放
      let result = {}; //返回的本次计算的 坐标和宽高
      const setTextHeight = []; //记录每次 文本计算的高度
      if (textVal && textVal.length) {
        textVal.forEach(item => {
          // 绘制文案信息
          const centerAreaText = self.drawText(
            arg[0],
            arg[1] + self.intervalY + textValHeight,
            arg[2],
            null,
            item || '--',
            arg[4].color,
            null,
            15
          );
          //设置垂直居中
          centerAreaText.verticalAlign('middle');
          textValHeight += centerAreaText.getHeight(); //累加文案高度
          setTextHeight.push({
            sum: textValHeight,
            num: centerAreaText.getHeight()
          });
          // 保存生成的文案对象
          textValCon.push(centerAreaText);
        });
      }

      if (textValHeight) {
        const minHeight = self.totalHeight * 0.19; //最小高度
        const centerTopTitleRect = self.drawRect(
          arg[0],
          arg[1],
          arg[2],
          arg[3] || textValHeight <= minHeight ? minHeight : textValHeight,
          arg[4].backgroundColor,
          null,
          arg[4].backgroundColor
        );
        // 添加矩形
        arg[5].add(centerTopTitleRect);
        // 需要向下平移的高度
        const tranY = parseInt(
          (centerTopTitleRect.getHeight() -
            setTextHeight[setTextHeight.length - 1].sum) /
            2,
          10
        );
        // 添加文案
        textValCon.forEach((item, index) => {
          // 根据 文案长度 重新 确定 文案的x轴 相对于矩形 arg[0] + (centerTopTitleRect.getAttr('width') - item.getAttr('width'))/2
          item.setAttr(
            'x',
            arg[0] + (centerTopTitleRect.getWidth() - item.getWidth()) / 2
          );
          // 上一条信息的高度
          const prevNum = setTextHeight[index - 1]
            ? setTextHeight[index - 1].sum
            : 0;
          // 本条信息的y轴坐标 = 上一条信息的高度 + 整体向下移动的高度 + 矩形空间的一半
          item.setAttr('y', arg[1] + tranY + prevNum);
          // 将文案对象 加入到图层中。
          arg[5].add(item);
        });

        self.saveSeriesRect[arg[6]] = centerTopTitleRect;

        result = {
          x: centerTopTitleRect.getAttr('x'),
          y: centerTopTitleRect.getAttr('y'),
          width: centerTopTitleRect.getWidth(),
          height: centerTopTitleRect.getHeight()
        };
      }
      return result;
    },
    /**
     * 绘制四个角的框以及文案
     * @param { String } thisIndex 类型 下标
     * @param { Object } canvasDataObj 数据源
     * @param { Object } layer 图层对象
     * */
    drawFourRect(thisIndex, canvasDataObj, layer) {
      const self = this;
      if (canvasDataObj.legend[thisIndex]) {
        const theSumHeight =
          (thisIndex + 1) % 2 !== 0 ? 'sumleftHeight' : 'sumrightHeight';

        const transX = (thisIndex + 1) % 2 !== 0 ? 0 : 0.78 * self.totalWidth;
        // 容器 文案 标题 宽度
        const theBoxWidth = self.totalWidth * 0.22;
        //  小标题
        const tTitle = self.drawText(
          self.intervalX + transX,
          self.intervalY + self[theSumHeight],
          theBoxWidth,
          null,
          canvasDataObj.legend[thisIndex].title.value
            ? `${canvasDataObj.legend[thisIndex].title.value}：`
            : '--',
          canvasDataObj.legend[thisIndex].title.color,
          'left'
        );

        // 内容区域
        const sText = self.drawText(
          self.intervalX + transX,
          self.intervalY + tTitle.getHeight() + self[theSumHeight],
          theBoxWidth,
          null,
          canvasDataObj.legend[thisIndex].text.value
            ? `${canvasDataObj.legend[thisIndex].text.value}`
            : '--',
          canvasDataObj.legend[thisIndex].text.color,
          'left',
          15
        );

        const theHeight =
          sText.getHeight() + tTitle.getHeight() + self.intervalY;

        // 区域
        const sRect = self.drawRect(
          self.intervalX + transX,
          self[theSumHeight],
          theBoxWidth,
          theHeight,
          null,
          null,
          canvasDataObj.legend[thisIndex].rectColor
        );

        // 根据类型 判断是否从下面开始设置y轴
        if (
          thisIndex === canvasDataObj.legend.length - 2 ||
          thisIndex === canvasDataObj.legend.length - 1
        ) {
          const rectHeight = sRect.getHeight();

          const transY =
            thisIndex === canvasDataObj.legend.length - 2 ||
            thisIndex === canvasDataObj.legend.length - 1
              ? self.totalHeight - rectHeight
              : 0;
          tTitle.setAttr('y', transY + self.intervalY);
          sText.setAttr('y', transY + tTitle.getHeight() + self.intervalY);
          sRect.setAttr('y', transY);
        }

        // 添加 矩形
        layer.add(sRect);
        // 添加矩形内部标题
        layer.add(tTitle);
        //  添加 文案
        layer.add(sText);

        self.saveLegendRect[thisIndex] = sRect;

        // 累加高度
        self[theSumHeight] += theHeight;
      }
    },
    /***
     * 画圆（点）
     * * */
    drawCircle(...arg) {
      return new Konva.Circle({
        x: arg[0],
        y: arg[1],
        radius: 5,
        fill: arg[2] || 'black',
        stroke: 'black',
        strokeWidth: 0
      });
    },
    /***
     * 画线
     * * */
    drawLine(...arg) {
      return new Konva.Line({
        x: arg[0],
        y: arg[1],
        points: arg[2],
        stroke: 'black',
        strokeWidth: arg[3] || 1
      });
    },
    /**
     * 绘制文本
     * * */
    drawText(...arg) {
      return new Konva.Text({
        x: arg[0], //矩形相对父容器的坐标
        y: arg[1],
        width: arg[2] || null, //矩形的宽高
        height: arg[3] || null,
        text: arg[4],
        fill: arg[5] || 'black',
        align: arg[6] || 'center',
        fontSize: arg[7] || 16,
        padding: 5,
        verticalAlign: 'middle ',
        fontFamily: 'Calibri'
      });
    },
    /**
     * 绘制矩形
     * * */
    drawRect(...arg) {
      return new Konva.Rect({
        x: arg[0], //矩形相对父容器的坐标
        y: arg[1],
        width: arg[2], //矩形的宽高
        height: arg[3],
        fill: arg[4] || '#fff',
        strokeWidth: arg[5] || arg[5] === 0 ? arg[5] : 1,
        stroke: arg[6] || '#fff'
        // cornerRadius: 25 //圆角
      });
    }
  }
};
</script>

<style>
#containerBox {
  width: 100%;
  height: 600px;
}

#container {
  width: 100%;
  height: 100%;
  /* background-color: burlywood; */
}
</style>
