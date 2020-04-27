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
        legend: {
          data: ['万科', '保利', '中海'],
          formatter: val => {
            return val.value + val.name;
          },
          show: true //是否显示图例
        },
        color: [
          '#1176b7',
          '#2596d0',
          '#f96226',
          '#fd8421',
          '#fbb733',
          '#ffdb43'
        ],
        // x轴
        xAxis: {
          data: [
            '2018年第一季度',
            '2018年第二季度',
            '2018年第三季度',
            '2018年第四季度'
          ],
          show: true //是否显示X轴
        },
        series: [
          {
            name: '万科',
            markLine: {
              show: true
            },
            data: [
              {
                value: 266,
                description: '激进'
              },
              {
                value: 333
              },
              {
                value: 222
              },
              {
                value: 444
              }
            ],
            label: {
              formatter: val => {
                return val.value + val.name;
              }
            }
          },
          {
            name: '保利',
            data: [
              {
                value: 123,
                description: '激进'
              },
              {
                value: 345
              },
              {
                value: 234
              },
              {
                value: 456
              }
            ]
          },
          {
            name: '中海',
            data: [
              {
                value: 543,
                description: '激进'
              },
              {
                value: 654
              },
              {
                value: 432
              },
              {
                value: 312
              }
            ]
          }
        ]
      }
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
     * * */
    createMoreRect(dataObj) {
      const self = this;
      const canvasDataObj = self.deepClone(dataObj);
      const canvasDom = document.getElementById('container');
      // 当前容器宽高
      const boxWidth = canvasDom.offsetWidth;
      const boxHeight = canvasDom.offsetHeight;
      const intervalX = 0.01 * boxWidth; //横向间隔
      const intervalY = 0.01 * boxHeight; //纵向间隔
      // 可能经过计算的宽高
      const theWidth = boxWidth;
      let theHeight = boxHeight;

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

      // 获取颜色数组
      const colorArr = self.createColorArr(canvasDataObj);

      // 创建层
      const layer = new Konva.Layer();
      stage.add(layer);
      //缩小高度 用于 x轴/图例存放 --- 图例位于顶部/x位于底部
      let theYRange = canvasDataObj.legend.show ? theHeight * 0.15 : 0; //x/图例

      if (canvasDataObj.legend.show && canvasDataObj.xAxis.show) {
        theHeight = theHeight * 0.7;
      } else if (canvasDataObj.legend.show || canvasDataObj.xAxis.show) {
        theHeight = theHeight * 0.85;
      }

      const rectLatSp = theWidth / canvasDataObj.xAxis.data.length; // 矩阵横向 均分
      const rectLongSp = theHeight / canvasDataObj.series.length; // 矩阵纵向均分
      const xLineY = boxHeight * 0.86; //x轴的纵向坐标
      const xLineH = boxHeight * 0.14; //x轴高度

      // 进行画线的坐标
      const points = [];
      // 折线上的原点
      const linePointArr = [];
      // 创建线的图层
      // const lineLayer = new Konva.Layer();
      // stage.add(lineLayer);

      // 是否绘制 x轴
      if (canvasDataObj.xAxis.show) {
        // 画线
        const xLayerLine = self.drawLine(0, 0, [
          intervalX,
          xLineY,
          boxWidth - intervalX,
          xLineY
        ]);
        layer.add(xLayerLine);
      }

      // 绘制图例
      self.isDrawLegned(
        boxWidth,
        boxHeight,
        intervalX,
        intervalY,
        colorArr,
        canvasDataObj,
        layer
      );

      // 鼠标滑过的文案
      // 矩形容器
      const toolTipBox = self.drawRect(null, null, null, null, null, 0.1);

      // 文案
      const tooltip = new Konva.Text({
        text: '',
        fontFamily: 'Calibri',
        fontSize: 12,
        padding: 5,
        textFill: 'white',
        fill: 'white',
        alpha: 0.75,
        visible: false
      });

      // 排序
      for (let i = 0; i < canvasDataObj.xAxis.data.length; i++) {
        const indexVal = [];
        const element = canvasDataObj.xAxis.data[i]; //横坐标的值
        const index = i;
        const x = intervalX + index * rectLatSp;
        const width = rectLatSp - 2 * intervalX;
        for (let j = 0; j < canvasDataObj.series.length; j++) {
          const value = canvasDataObj.series[j].data[i]; //当前单元格的值
          indexVal.push({
            ...value,
            name: canvasDataObj.series[j].name,
            markLine: canvasDataObj.series[j].markLine,
            label: canvasDataObj.series[j].label || null
          });
        }
        //绘制x轴的文案
        if (canvasDataObj.xAxis.show) {
          // 矩阵内的文案
          const xLineText = self.drawText(
            x,
            xLineY + intervalY,
            width,
            xLineH,
            element || '--'
          );
          //设置垂直居中
          // xLineText.verticalAlign('middle');
          // 添加 矩形
          layer.add(xLineText);
        }
        //排序
        indexVal.sort((b, a) => a.value - b.value);
        //添加到数据源
        for (let j = 0; j < indexVal.length; j++) {
          const value = indexVal[j];
          const sDataIndex = j;
          const height = rectLongSp - 2 * intervalY;
          const y = theYRange + intervalY + sDataIndex * rectLongSp;

          let fill = '#00D2FF';

          //根据图例 获取颜色
          if (colorArr.length) {
            const obj = colorArr.find(eles =>
              String(value.name).includes(eles.name)
            );
            if (obj) {
              fill = obj.color;
            }
          }

          // 矩形
          const ourReact = self.drawRect(x, y, width, height, fill);
          let textVal = value.value || '--';
          // 文本回调
          if (value.label && value.label.formatter) {
            textVal = value.label.formatter(value);
          }
          // 矩阵内的文案
          const text = self.drawText(x, y, width, height, textVal);
          //设置垂直居中
          text.verticalAlign('middle');
          // 添加 矩形
          layer.add(ourReact);

          // 添加矩形内部文字
          layer.add(text);
          // 添加自定义颜色
          ourReact.customColor_in = self.colorChangeRgb(fill, 'light');
          ourReact.customColor_out = self.colorChangeRgb(fill, 'black');
          text.customColor_in = self.colorChangeRgb('black', 'light');
          text.customColor_out = self.colorChangeRgb('black', 'black');
          // 保存 矩阵单元实例 --- 滑过图例的时候用
          self.rectItemArr.push([ourReact, text]);
          //当前类型 --- 和图例对应
          text.typeName = value.name;
          // 类别
          text.customType = 'rect_text';
          // 保存当前数据对象
          text.customDataObj = value;

          if (value.markLine && value.markLine.show) {
            points.push(x + 0.5 * width, y + 0.5 * height);
            // 画圆
            const circle = self.drawCircle(x + 0.5 * width, y + 0.5 * height);
            layer.add(circle);
            circle.customType = 'rect_circle';
          }

          //将 当前矩形  保存到 文本对象中
          text.ourReact = ourReact;
        }
      }

      // 是否绘制折线图层
      // 画线
      const line = self.drawLine(0, 0, points, 2);
      layer.add(line);
      line.customType = 'rect_line';
      // layer.draw(); //绘制图层 --- 折线

      // 添加 文案
      layer.add(toolTipBox);
      layer.add(tooltip);

      layer.draw(); //绘制图层--矩阵

      /**
       * 事件绑定部分
       * * */
      stage.on('mouseover', evt => {
        const thisTarget = evt.target;
        // 矩阵文本
        if (thisTarget.customType === 'rect_text') {
          // 缩放矩形和文案
          self.mouseoverOut(thisTarget.ourReact, 'rect', 'in');
          self.mouseoverOut(thisTarget, 'text', 'in');
          // 高亮矩形
          thisTarget.ourReact.setAttr('opcity', 1);
        } else if (
          thisTarget.customType === 'rect_line' ||
          thisTarget.customType === 'rect_circle'
        ) {
          // 矩阵的折线
          self.mouseoverOut(line, 'line', 'in');
        }
        layer.draw();
      });

      stage.on('mouseout', evt => {
        const thisTarget = evt.target;
        // 矩阵文本
        if (thisTarget.customType === 'rect_text') {
          // 缩放矩形和文案
          self.mouseoverOut(thisTarget.ourReact, 'rect', 'out');
          self.mouseoverOut(thisTarget, 'text', 'out');
          toolTipBox.hide();
          tooltip.hide();
        } else if (
          thisTarget.customType === 'rect_line' ||
          thisTarget.customType === 'rect_circle'
        ) {
          // 矩阵的折线 --- 滑过 折线/折线上的小圆点
          self.mouseoverOut(line, 'line', 'out');
        }
        layer.draw();
      });

      stage.on('mousemove', evt => {
        const thisTarget = evt.target;
        // 矩阵文本
        if (thisTarget.customType === 'rect_text') {
          const { customDataObj } = thisTarget;
          const mousePos = stage.getPointerPosition();
          let thisLabel = thisTarget._partialText;
          // 文本回调
          if (canvasDataObj.legend && canvasDataObj.legend.formatter) {
            thisLabel = canvasDataObj.legend.formatter(customDataObj);
          }
          tooltip.text(thisLabel);
          const tooltipW = tooltip.getWidth();
          const tooltipH = tooltip.getHeight();
          let tooltipY = mousePos.y + intervalY;
          let tooltipX = mousePos.x + intervalX;
          //判断左右两侧剩余的宽度是否可显示 如果不可  则+-文案的额宽度
          if (boxWidth - tooltipX < tooltipW) {
            // 计算右侧 --- 如果此时 box-x < width 则 此时的x  减去本身宽度
            tooltipX -= tooltipW;
          }

          // 判断上下高度
          if (boxHeight - tooltipY < tooltipH) {
            // 计算底部 如果此时  box - y < height 那么此时的y  减去height
            tooltipY -= tooltipH + intervalY;
          }

          tooltip.position({
            x: tooltipX + intervalX,
            y: tooltipY + intervalY
          });

          toolTipBox.setAttrs({
            x: tooltipX,
            y: tooltipY,
            width: tooltipW + 2 * intervalX,
            height: tooltipH + 2 * intervalY,
            fill: 'rgba(105, 105, 105,.7)'
          });
          toolTipBox.show();
          tooltip.show();
          layer.draw();
        }
      });

      // 清空画布
      // stage.clear()
      // 缩放
      // self.theCanvasZoom(stage);
    },
    /**
     * 16进制转rgba
     * @param { String } str 颜色字符串
     * @param { String } type 类型 浅色 light /深色 black
     * * */
    colorChangeRgb(str, type) {
      const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      let sColor = str.toLowerCase();
      let result = str;
      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          let sColorNew = '#';
          for (let i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
          }
          sColor = sColorNew;
        }
        //处理六位的颜色
        const sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
          sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
        }
        result =
          'rgba(' +
          sColorChange.join(',') +
          (type === 'light' ? ',0.7)' : ',1)');
      } else {
        result = sColor;
      }
      return result;
    },
    /**
     * 鼠标划入划出的缩放动画 --- 矩形
     * @param { Object } shape 当前对象
     * @param { String } type 划入划出的类型 in / out
     * @param { String } objType 对象类型 line / rect
     * * */
    mouseoverOut(shape, objType, type) {
      const self = this;
      if (objType === 'line') {
        shape.setAttrs({
          stroke: self.colorChangeRgb(
            '#000000',
            type === 'in' ? 'light' : 'black'
          ),
          strokeWidth: type === 'in' ? 5 : 2
        });
      } else {
        shape.setAttrs({
          fill: type === 'in' ? shape.customColor_in : shape.customColor_out
        });
      }
    },
    /**
     * 缩放
     * * */
    theCanvasZoom(stage) {
      const scaleBy = 1.01;
      stage.on('wheel', e => {
        e.evt.preventDefault();
        const oldScale = stage.scaleX();

        const mousePointTo = {
          x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
          y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
        };

        const newScale =
          e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
        stage.scale({ x: newScale, y: newScale });

        const newPos = {
          x:
            -(mousePointTo.x - stage.getPointerPosition().x / newScale) *
            newScale,
          y:
            -(mousePointTo.y - stage.getPointerPosition().y / newScale) *
            newScale
        };
        stage.position(newPos);
        stage.batchDraw();
      });
    },
    /**
     * 绘制图例
     * * */
    isDrawLegned(...arg) {
      const self = this;
      //置灰
      const theColor = 'rgba(220, 220, 220,.8)';
      // 是否绘制图例
      if (arg[5].legend.show) {
        // 画线
        // const xLayerLine = self.drawLine(0, 0, [
        //   arg[2],
        //   xLineH,
        //   arg[0] - arg[2],
        //   xLineH
        // ]);
        // arg[6].add(xLayerLine);

        let legnedArr = null;
        if (arg[4].length) {
          legnedArr = [...arg[4]];
        } else {
          //此处 做没有 lengend的兼容
        }

        const lengendWidth = arg[0] - 2 * arg[2];
        const lengendHeight = 0.14 * arg[1] - 2 * arg[3];

        // 累加和
        let sumWidth = 0;
        // 保存的当前情况的下标
        let index = 0;
        // 上一个元素高度
        let prevHeight = 0;

        // 绘制 图例
        const drawLegend = (index, ind, x = 0, y = 0, isLeft = false) => {
          // 上一个元素宽度
          let prevWidth = 0;
          //绘制之前的元素 --- 从左向右
          for (let j = index; j <= ind; j++) {
            const baseX = arg[2] + prevWidth + x; //x坐标
            const baseY = arg[3] + prevHeight + y; //y
            // 当前图例是否存在于被选中的数组中
            const isSelect = self.selectLegnedName.includes(legnedArr[j].name);
            //绘制
            const circle = self.drawCircle(
              arg[2] + baseX,
              baseY,
              isSelect ? theColor : legnedArr[j].color
            );
            const thisCirW = circle.getWidth() + arg[2];
            // 矩阵内的文案
            const drawLengend = self.drawText(
              baseX + thisCirW,
              baseY,
              null,
              null,
              legnedArr[j].name || '--',
              isSelect ? theColor : 'black'
            );
            // 重置Y
            circle.setAttr(
              'y',
              circle.getWidth() / 2 +
                baseY +
                (drawLengend.getHeight() - circle.getHeight()) / 2
            );
            arg[6].add(circle);
            arg[6].add(drawLengend);

            // 矩形
            const legendBox = self.drawRect(
              baseX,
              baseY,
              thisCirW + drawLengend.getWidth(),
              drawLengend.getHeight(),
              'rgba(255, 255, 255,	0)',
              0
            );

            arg[6].add(legendBox);

            // 添加状态 --- 是否显示
            legendBox.isShow = !isSelect;

            legendBox.customType = 'legend_box';

            legendBox.on('mouseover', () => {
              self.filtrerRectItem = self.rectItemArr.filter(
                items => String(items[1].typeName) === String(legnedArr[j].name)
              );
              //设置相应的放大 并且进行重绘
              self.filtrerRectItem.forEach(items => {
                self.mouseoverOut(items[0], 'rect', 'in');
                self.mouseoverOut(items[1], 'text', 'in');
              });
              arg[6].draw();
            });

            legendBox.on('click', () => {
              // 修改状态
              legendBox.isShow = !legendBox.isShow;
              const dataObjs = { ...arg[5] };
              // 图例颜色切换
              if (legendBox.isShow) {
                // 切换为显示状态 legnedArr[j].color / black
                circle.setAttr('fill', legnedArr[j].color);
                drawLengend.setAttr('fill', 'black');
                const selectNameInd = self.selectLegnedName.findIndex(
                  item => item === legnedArr[j].name
                );
                if (selectNameInd > -1) {
                  // 当前选中的图例名称
                  self.selectLegnedName.splice(selectNameInd, 1);
                }

                // 修改数据源
                const copyDates = self.deepClone(self.copyData);
                // 从备份数据源中  获取  当前选中元素以及下标
                const findItemFun = item => item.name === legnedArr[j].name;
                let inds = copyDates.series.findIndex(theEle =>
                  findItemFun(theEle)
                );
                let theItem = copyDates.series.find(theEle =>
                  findItemFun(theEle)
                );
                const theDataArr = [];
                // 将数据按照 备份数据的下标 重新归位
                dataObjs.series.forEach(items => {
                  const theIndexs = copyDates.series.findIndex(
                    theEle => theEle.name === items.name
                  );
                  theDataArr[theIndexs] = items;
                });

                // 向后添加
                theDataArr.push(theItem);
                const result = [];
                //去除所有的空位置
                theDataArr.forEach(items => {
                  if (items) {
                    result.push(items);
                  }
                });
                dataObjs.series = result;
              } else {
                // 切换为隐藏状态
                circle.setAttr('fill', theColor);
                drawLengend.setAttr('fill', theColor);
                // 当前选中的图例名称
                self.selectLegnedName.push(legnedArr[j].name);
                // 修改数据源
                const theIndex = dataObjs.series.findIndex(
                  theItem => theItem.name === legnedArr[j].name
                );
                if (theIndex > -1) {
                  dataObjs.series.splice(theIndex, 1);
                }
              }
              // 重新初始化
              self.revertCanvas(dataObjs);
              // arg[6].draw();
            });

            legendBox.on('mouseout', () => {
              // 设置相应的缩小 并且重绘
              self.filtrerRectItem.forEach(items => {
                self.mouseoverOut(items[0], 'rect', 'out');
                self.mouseoverOut(items[1], 'text', 'out');
              });
              self.filtrerRectItem = null;
              arg[6].draw();
            });

            // 累加宽度
            prevWidth += drawLengend.getWidth() + arg[2] + thisCirW;
            // 是否从左向右
            if (j === ind && isLeft) {
              // 保存当前高度
              prevHeight = drawLengend.getHeight() + arg[3];
            }
          }
        };

        for (let i = 0; i < legnedArr.length; i++) {
          const circle = self.drawCircle(arg[2], arg[3]);
          // 矩阵内的文案
          const legendText = self.drawText(
            circle.getWidth() + arg[2],
            arg[3],
            null,
            null,
            legnedArr[i].name || '--'
          );
          // 获取当前文案宽度
          const theTextWidth =
            legendText.getWidth() + arg[2] + circle.getWidth();
          // 如果当前元素 累加后  总宽度大于容器 那么 绘制之前的
          if (sumWidth + theTextWidth > lengendWidth) {
            drawLegend(index, i - 1, 0, 0, true);
            // 把当前元素的宽度 再累加回去  0 + thisWidth
            sumWidth = theTextWidth;
            index = i;
          } else {
            sumWidth += theTextWidth;
          }

          // 1>一行的时候  2>多行的最后一行
          if (i === legnedArr.length - 1 && sumWidth < lengendWidth) {
            const left = (lengendWidth - sumWidth) / 2;
            drawLegend(index, i, left, 0);
          }
        }
      }
    },
    /**
     * 获取颜色数组 name:图例  color:对应颜色
     * @param { Object } dataObj 数据对象 --- 传入的配置表
     * * */
    createColorArr(dataObj) {
      let result = [];
      let colorNum = 0; //取color的下标
      if (dataObj.legend && dataObj.legend.data && dataObj.legend.data.length) {
        dataObj.legend.data.forEach((item, index) => {
          const objs = result.find(ele => ele.name === item);
          if (!objs) {
            result.push({
              name: item,
              color: dataObj.color[colorNum]
            });
            colorNum++;
          }
        });
      }
      return result;
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
        align: 'center',
        verticalAlign: 'middle ',
        fontSize: 16,
        fontFamily: 'Calibri',
        fill: 'black'
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
        fill: arg[4],
        strokeWidth: arg[5] || arg[5] === 0 ? arg[5] : 1,
        stroke: arg[6] || 'black'
        // cornerRadius: 25 //圆角
      });
    }
  }
};
</script>

<style>
#containerBox {
  width: 500px;
  height: 400px;
}

#container {
  width: 100%;
  height: 100%;
}
</style>
