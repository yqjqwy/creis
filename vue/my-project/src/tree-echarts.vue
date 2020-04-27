<template>
  <div
    id="main"
    class="mao-main"
    style="height: 1000px; width: 100%;"
  >
    测试
  </div>
</template>
<script>
// import echarts from 'echarts';
// import './custom';

import { data } from './data/tree-echarts-data';
// import './echarts2';
let treeId = 1;

var Text = require2('zrender/shape/Text');
var ImageShape = require2('zrender/shape/Image');
var Rectangle = require2('zrender/shape/Rectangle');
let canEditRect = false;

export default {
  name: 'tree-echarts',
  data() {
    return {
      myChart: {},
      rootData: null,
      gudongData: null,
      touziData: null,
      option: {}
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.myChart = echarts.init(document.getElementById('main'));
      const { gudong, touzi } = data;
      this.rootData = data;
      this.gudongData = gudong;
      this.touziData = touzi;
      this.transTree(gudong, 1);
      this.initTree(gudong);
      this.transTree(touzi, 2);
      this.initTree(touzi);
      this.drawGuquan();
    });
  },
  methods: {
    //股权穿透图
    drawGuquan() {
      const self = this;
      self.myChart.clear();
      const option = {
        title: {
          text: ''
        },
        series: []
      };
      var roam = true;
      if (window.iframe) {
        roam = 'move';
      }
      if (self.gudongData) {
        option.series.push({
          type: 'tree',
          orient: 'vertical',
          nodePadding: 25,
          layerPadding: 40,
          symbol: 'circle',
          roam: roam,
          rootLocation: {
            x: '50%',
            y: '50%'
          },
          direction: 'inverse',
          data: [self.gudongData]
        });
      }
      if (self.touziData) {
        option.series.push({
          type: 'tree',
          orient: 'vertical',
          nodePadding: 25,
          layerPadding: 40,
          symbol: 'circle',
          roam: roam,
          rootLocation: {
            x: '50%',
            y: '50%'
          },
          //direction:"inverse",
          data: [self.touziData]
        });
      }
      if (self.gudongData && !self.touziData) {
        option.series[0].rootLocation.y = '65%';
      }

      self.myChart.setOption(option);
      self.option = option;
      self.initZrender();
      self.animatieChart(self.myChart);

      var isDrag;
      var dragStartPos;
      self.myChart.getZrender().on('mousedown', function(param) {
        isDrag = true;
        dragStartPos = [param.event.x, param.event.y];
      });
      self.myChart.getZrender().on('mouseup', function(param) {
        if (
          dragStartPos[0] == param.event.x &&
          dragStartPos[1] == param.event.y
        ) {
          isDrag = false;
        }
        dragStartPos = [];
      });

      self.myChart.getZrender().on('click', function(e) {
        if (isDrag) return;
        if (e.target && e.target.clickcom) {
          self.troggleTree(e.target.keyNo, e.target.treeId);
        }
        if (e.target && e.target.editcom) {
          self.editTree(e.target.keyNo, e.target.treeId);
        }
      });

      self.myChart.on('restore', function(param) {
        getNode(self.gudongData);
        getNode(self.touziData);
        function getNode(data) {
          if (!data) return;
          if (data.children) {
            for (var i = 0; i < data.children.length; i++) {
              getNode(data.children[i]);
            }
          }
          if (
            data.children &&
            data.children.length > 0 &&
            data.KeyNo &&
            data.KeyNo != self.getQueryString('keyNo')
          ) {
            data._children = data.children;
            data.children = null;
            data.extend = 1;
            //data.symbol = 'circleCross';
          }
        }
        self.myChart.clear();

        self.myChart.setOption(self.option);
        self.initZrender();
        self.animatieChart(self.myChart);
      });
    },
    transTree(data, type) {
      const self = this;
      if (!data) return;
      data.children = data.DetailList;
      data.DetailList = undefined;
      data.treeId = treeId;
      if (type == 2) {
        data.isTouzi = true;
      }
      var fontSize = 12;
      if (data.ShortStatus == '注销' || data.ShortStatus == '吊销') {
        data.Name = '【' + data.ShortStatus + '】' + data.Name;
      }
      if (data.Name.length > 20) {
        data.name = data.Name.substr(0, 19) + '…';
        data.ltext = true;
      } else {
        data.name = data.Name;
      }
      if (data.Org == 2 && data.Name.length > 8) {
        data.name = data.Name.substr(0, 7) + '…';
      }
      data.name = data.name.replace(/(.{10})(?=.)/g, '$1\n');

      if (data.StockRightNum) {
        data.subtext = '持股数：' + data.StockRightNum + '';
      } else if (data.ShouldCapi) {
        data.subtext = '认缴金额：' + data.ShouldCapi;
      }
      if (data.KeyNo) {
        if (data.Tags) {
          for (var i = 0; i < data.Tags.length; i++) {
            if (data.Tags[i].Type == 402) {
              data.tag = data.Tags[i].Name;
            }
          }
        }
      }

      if (data.Tags) {
        $.each(data.Tags, function(index, vo) {
          if (vo.Type == 2) {
            data.tag = '上市公司';
            data.list = true;
          } else if (vo.Type == 1) {
            data.tag = '新三板公司';
            data.list = true;
          } else if (vo.Type == 401) {
            data.tag = '港股上市';
            data.list = true;
          }
        });
      }

      data.editable = true;
      data.symbol = 'rectangle';
      data.symbolSize = [146, 62];
      if (data.tag) {
        data.symbolSize = [146, 82];
      }
      data.labelClick = true;
      data.itemStyle = {
        normal: {
          color: '#fff',
          borderWidth: '1',
          borderColor: '#ccc',
          label: {
            show: true,
            position: 'inside',
            textStyle: {
              fontFamily: 'MicroSoft YaHei',
              fontSize: fontSize,
              color: '#333',
              fontStyle: 'normal'
            }
          }
        },
        emphasis: {
          color: 'rgba(255,255,255,0)',
          borderWidth: '1',
          borderColor: 'rgba(255,255,255,0)'
        }
      };

      if (data.Org == 2) {
        data.symbol = 'rectangle';
        data.clickable = true;
        data.labelClick = false;
        data.symbolSize = [146, 55];
        data.itemStyle = {
          normal: {
            color: '#F3F9FE',
            borderWidth: '1',
            borderColor: '#128bed',
            label: {
              show: !0,
              position: 'inside',
              textStyle: {
                color: '#333',
                fontFamily: 'MicroSoft YaHei',
                fontSize: 14,
                fontStyle: 'normal'
              }
            }
          },
          emphasis: {
            color: 'rgba(255,255,255,0)',
            borderWidth: '1',
            borderColor: 'rgba(255,255,255,0)'
          }
        };
      }

      var children = data.children;
      if (children) {
        for (var i = 0; i < children.length; i++) {
          self.transTree(children[i], type);
          children[i] = self.addTampArrow(children[i], fontSize);
        }
      }

      if (type == 1) {
        if (self.rootData.kzr) {
          if (data.KeyNo) {
            if (data.KeyNo == self.rootData.kzr.ControllerData.KeyNo) {
              data.kzr = true;
            }
          } else {
            if (data.Name == self.rootData.kzr.ControllerData.Name) {
              data.kzr = true;
            }
          }
        }
        if (self.rootData.syr) {
          $.each(self.rootData.syr.Names, function(index, vo) {
            if (data.KeyNo) {
              if (data.KeyNo == vo.KeyNo) {
                data.syr = vo.PercentTotal;
              }
            } else {
              if (data.Name == vo.Name) {
                data.syr = vo.PercentTotal;
              }
            }
          });
        }
      } else if (type == 2) {
        if (self.rootData.kg) {
          $.each(self.rootData.kg.Names, function(index, vo) {
            if (type == 2 && data.KeyNo && data.KeyNo == vo.KeyNo) {
              data.kg = true;
            }
          });
        }
      }
      treeId++;
    },
    initZrender(jietu) {
      const self = this;
      const { myChart } = self;
      var shapeList = myChart.getZrender().storage.getShapeList();
      for (var i = 0; i < shapeList.length; i++) {
        if (shapeList[i].clickcom || shapeList[i].ndelete) {
          myChart.getZrender().delShape(shapeList[i].id);
        }
        if (
          shapeList[i]._echartsData &&
          shapeList[i]._echartsData._data &&
          shapeList[i].style.text
        ) {
          shapeList[i].style.text = shapeList[i].style.text.replace(
            /^\s+|\s+$/g,
            ''
          );
        }
      }
      for (var i = 0; i < shapeList.length; i++) {
        // if(shapeList[i]._echartsData&&shapeList[i]._echartsData._data.labelClick){
        //     var shape = new Text({
        //       style: {
        //           x: shapeList[i].rotation[1]+25,
        //           y: shapeList[i].rotation[2],
        //           text: shapeList[i]._echartsData._name,
        //           color : '#333' ,
        //           textFont:'normal 13px 微软雅黑',
        //           lineWidth :0,
        //       },
        //       highlightStyle : {
        //           lineWidth :0,
        //           strokeColor:'rgba(0,0,0,0)',
        //         }
        //     });
        //     shape.keyNo = shapeList[i]._echartsData._data.KeyNo;
        //     shape.zlevel = 1;
        //     shape.z = 4;
        //     shape.clickable = true;
        //     myChart.getZrender().addShape(shape);
        // }
        if (
          shapeList[i]._echartsData &&
          shapeList[i]._echartsData._data.subtext
        ) {
          shapeList[i].style.text = shapeList[i].style.text + '\n';
          var shapeY = shapeList[i].rotation[2] + 12;
          if (shapeList[i]._echartsData._data.name.length > 10) {
            shapeY = shapeList[i].rotation[2] + 16;
          }
          if (shapeList[i]._echartsData._data.Org == 2) {
            shapeY = shapeList[i].rotation[2] + 11;
          }
          if (shapeList[i]._echartsData._data.tag) {
            if (shapeList[i]._echartsData._data.name.length > 10) {
              shapeY = shapeList[i].rotation[2] + 4;
            } else {
              shapeY = shapeList[i].rotation[2] + 1;
            }
          }
          var shape = new Text({
            style: {
              x: shapeList[i].rotation[1],
              y: shapeY,
              text: shapeList[i]._echartsData._data.subtext,
              color: '#666',
              textFont: 'normal 11px 微软雅黑',
              textAlign: 'center',
              lineWidth: 0
            },
            highlightStyle: {
              lineWidth: 0,
              color: '#666',
              strokeColor: 'rgba(255,255,255,0)'
            }
          });
          shape.zlevel = 1;
          shape.z = 5;
          shape.ndelete = true;
          shape.hoverable = false;
          myChart.getZrender().addShape(shape);
        }
        if (
          shapeList[i]._echartsData &&
          shapeList[i]._echartsData._data.extend &&
          !jietu
        ) {
          var iconImg = '';
          var isIE11 = !!window.ActiveXObject || 'ActiveXObject' in window;
          if (shapeList[i]._echartsData._data.extend == 1) {
            if (isIE11) {
              iconImg = require('./images/tupu_cross.svg');
            } else {
              iconImg = require('./images/tupu_cross.svg');
            }
          } else if (shapeList[i]._echartsData._data.extend == 2) {
            if (isIE11) {
              iconImg = require('./images/tupu_minus.svg');
            } else {
              iconImg = require('./images/tupu_minus.svg');
            }
          }
          var shapeY = shapeList[i].rotation[2];
          if (shapeList[i]._echartsData._data.isTouzi) {
            shapeY = shapeY + shapeList[i].style.height / 2;
          } else {
            shapeY = shapeY - shapeList[i].style.height / 2 - 18;
          }
          var shape = new ImageShape({
            style: {
              image: iconImg,
              x: shapeList[i].rotation[1] - 9,
              y: shapeY,
              width: 18,
              height: 18
            }
          });
          shape.keyNo = shapeList[i]._echartsData._data.KeyNo;
          shape.treeId = shapeList[i]._echartsData._data.treeId;
          shape.zlevel = 1;
          shape.z = 4;
          shape.ndelete = true;
          shape.clickcom = true;
          shape.hoverable = true;
          shape.clickable = true;
          myChart.getZrender().addShape(shape);
        }
        if (
          shapeList[i]._echartsData &&
          shapeList[i]._echartsData._data.editable &&
          canEditRect &&
          !jietu
        ) {
          var iconImg = '';
          var isIE11 = !!window.ActiveXObject || 'ActiveXObject' in window;
          if (isIE11) {
            // iconImg = './images/tupu_delete.png';
            iconImg = require('./images/tupu_cross.svg');
          } else {
            // iconImg = './images/tupu_delete.svg';
            iconImg = require('./images/tupu_minus.svg');
          }
          var shapeY = shapeList[i].rotation[2];
          if (shapeList[i]._echartsData._data.isTouzi) {
            shapeY = shapeY - shapeList[i].style.height / 2 - 9;
          } else {
            shapeY = shapeY - shapeList[i].style.height / 2 - 18 + 9;
          }
          var shape = new ImageShape({
            style: {
              image: iconImg,
              x: shapeList[i].rotation[1] - 9 + 72,
              y: shapeY,
              width: 18,
              height: 18
            }
          });
          shape.zlevel = 1;
          shape.z = 20;
          shape.keyNo = shapeList[i]._echartsData._data.KeyNo;
          shape.treeId = shapeList[i]._echartsData._data.treeId;
          shape.ndelete = true;
          shape.editcom = true;
          shape.hoverable = true;
          shape.clickable = true;
          myChart.getZrender().addShape(shape);
        }
        if (
          shapeList[i]._echartsData &&
          shapeList[i]._echartsData._data.kzr &&
          shapeList[i]._echartsData._data.syr
        ) {
          var shape = new ImageShape({
            style: {
              // image: './images/tupu_kzrsbg.png',
              image: require('./images/tupu_cross.svg'),
              x: shapeList[i].rotation[1] - 75,
              y: shapeList[i].rotation[2] - shapeList[i].style.height / 2 - 38,
              width: 150,
              height: 44
            },
            highlightStyle: {
              lineWidth: 0,
              strokeColor: '#fff'
            }
          });
          var shapeText = new Text({
            style: {
              x: shapeList[i].rotation[1],
              y: shapeList[i].rotation[2] - shapeList[i].style.height / 2 - 18,
              textFont: 'normal 11px 微软雅黑',
              text:
                '实际控制人\n' +
                '最终受益人：' +
                shapeList[i]._echartsData._data.syr,
              textAlign: 'center',
              color: '#fff',
              lineWidth: 0
            },
            highlightStyle: {
              lineWidth: 0,
              strokeColor: 'rgba(255,255,255,0)'
            }
          });
          shape.ndelete = true;
          shape.zlevel = 1;
          shape.z = 8;
          shape.hoverable = false;
          shapeText.zlevel = 1;
          shapeText.z = 10;
          shapeText.ndelete = true;
          shapeText.hoverable = false;
          myChart.getZrender().addShape(shape);
          myChart.getZrender().addShape(shapeText);
        } else if (
          shapeList[i]._echartsData &&
          shapeList[i]._echartsData._data.kzr
        ) {
          var shape = new ImageShape({
            style: {
              // image: './images/tupu_kzrbg.png',
              image: require('./images/tupu_cross.svg'),
              x: shapeList[i].rotation[1] - 75,
              y: shapeList[i].rotation[2] - shapeList[i].style.height / 2 - 24,
              width: 150,
              height: 30
            },
            highlightStyle: {
              lineWidth: 0,
              strokeColor: 'rgba(255,255,255,0)'
            }
          });
          var shapeText = new Text({
            style: {
              x: shapeList[i].rotation[1],
              y: shapeList[i].rotation[2] - shapeList[i].style.height / 2 - 12,
              textFont: 'normal 11px 微软雅黑',
              text: '实际控制人',
              textAlign: 'center',
              color: '#fff',
              lineWidth: 0
            },
            highlightStyle: {
              lineWidth: 0,
              color: '#F5A623',
              strokeColor: 'rgba(255,255,255,0)'
            }
          });
          shape.ndelete = true;
          shape.zlevel = 1;
          shape.z = 8;
          shape.hoverable = false;
          shapeText.zlevel = 1;
          shapeText.z = 10;
          shapeText.ndelete = true;
          shapeText.hoverable = false;
          myChart.getZrender().addShape(shape);
          myChart.getZrender().addShape(shapeText);
        } else if (
          shapeList[i]._echartsData &&
          shapeList[i]._echartsData._data.syr
        ) {
          var shape = new ImageShape({
            style: {
              // image: './images/tupu_syrbg.png',
              image: require('./images/tupu_cross.svg'),
              x: shapeList[i].rotation[1] - 75,
              y: shapeList[i].rotation[2] - shapeList[i].style.height / 2 - 24,
              width: 150,
              height: 30
            },
            highlightStyle: {
              lineWidth: 0,
              strokeColor: 'rgba(255,255,255,0)'
            }
          });
          var shapeText = new Text({
            style: {
              x: shapeList[i].rotation[1],
              y: shapeList[i].rotation[2] - shapeList[i].style.height / 2 - 12,
              textFont: 'normal 11px 微软雅黑',
              text: '最终受益人：' + shapeList[i]._echartsData._data.syr,
              textAlign: 'center',
              color: '#fff',
              lineWidth: 0
            },
            highlightStyle: {
              lineWidth: 0,
              color: '#F5A623',
              strokeColor: 'rgba(255,255,255,0)'
            }
          });
          shape.ndelete = true;
          shape.zlevel = 1;
          shape.z = 8;
          shape.hoverable = false;
          shapeText.zlevel = 1;
          shapeText.z = 10;
          shapeText.ndelete = true;
          shapeText.hoverable = false;
          myChart.getZrender().addShape(shape);
          myChart.getZrender().addShape(shapeText);
        }
        if (shapeList[i]._echartsData && shapeList[i]._echartsData._data.kg) {
          var shapeY =
            shapeList[i].rotation[2] - shapeList[i].style.height / 2 - 21.5;
          if (shapeList[i]._echartsData._data.tag) {
            shapeY += 9;
          }
          var shapeX = shapeList[i].rotation[1] + 28;
          if (shapeList[i]._echartsData._data.ratio) {
            shapeX += shapeList[i]._echartsData._data.ratio.length * 10;
            if (shapeList[i]._echartsData._data.ratio.indexOf('.') != -1) {
              shapeX -= 10;
            }
          }
          var shapeText = new Text({
            style: {
              x: shapeX,
              y: shapeY,
              textFont: 'normal 11px 微软雅黑',
              text: '(控股)',
              textAlign: 'center',
              color: '#FD485E',
              lineWidth: 0
            },
            highlightStyle: {
              lineWidth: 0,
              color: '#FD485E',
              strokeColor: 'rgba(255,255,255,0)'
            }
          });
          shapeText.zlevel = 1;
          shapeText.z = 10;
          shapeText.ndelete = true;
          shapeText.hoverable = false;
          myChart.getZrender().addShape(shapeText);
        }
        if (shapeList[i]._echartsData && shapeList[i]._echartsData._data.tag) {
          shapeList[i].style.text = shapeList[i].style.text + '\n\n';
          var shapeColor = '#FFECCE';
          var shapeTextColor = '#F5A623';
          if (shapeList[i]._echartsData._data.list) {
            shapeColor = '#DDF0FF';
            shapeTextColor = '#128bed';
          }

          var shape = new Rectangle({
            style: {
              x: shapeList[i].rotation[1] - 72.5,
              y:
                shapeList[i].rotation[2] + shapeList[i].style.height / 2 - 22.5,
              width: 145,
              height: 22,
              color: shapeColor
            },
            highlightStyle: {
              lineWidth: 0,
              color: 'rgba(255,255,255,0)',
              strokeColor: '#fff'
            }
          });
          var shapeText = new Text({
            style: {
              x: shapeList[i].rotation[1] - 2,
              y: shapeList[i].rotation[2] + shapeList[i].style.height / 2 - 12,
              textFont: 'normal 12px 微软雅黑',
              text: shapeList[i]._echartsData._data.tag,
              textAlign: 'center',
              color: shapeTextColor,
              fontSize: 14,
              lineWidth: 0
            },
            highlightStyle: {
              lineWidth: 0,
              color: shapeTextColor,
              strokeColor: 'rgba(255,255,255,0)'
            }
          });
          shape.zlevel = 1;
          shape.z = 4;
          shape.ndelete = true;
          shape.hoverable = false;
          shapeText.zlevel = 1;
          shapeText.z = 5;
          shapeText.ndelete = true;
          shapeText.hoverable = false;
          myChart.getZrender().addShape(shape);
          myChart.getZrender().addShape(shapeText);
        }
      }
    },
    addTampArrow(cnode, fontSize) {
      const self = this;
      var tamp = cnode;
      var Ratio = !cnode.Percent || cnode.Percent == '0%' ? '' : cnode.Percent;
      if (Ratio) {
        Ratio =
          (parseFloat(
            cnode.Percent.substr(0, cnode.Percent.length - 1)
          ).toFixed(4) *
            10000) /
            10000 +
          '%';
        tamp.ratio = Ratio;
      }
      var labelShow = Ratio != '0%';
      cnode = {
        name: Ratio,
        symbol: 'arrowdown',
        symbolSize: [12, 12],
        tooltip: {
          show: !1
        },
        clickable: !1,
        hoverable: false,
        itemStyle: {
          normal: {
            color: '#128bed',
            borderWidth: 0,
            label: {
              show: labelShow,
              position: 'right',
              textStyle: {
                fontFamily: 'MicroSoft YaHei',
                fontSize: fontSize,
                fontStyle: 'normal'
              }
            }
          },
          emphasis: {
            color: '#128bed',
            borderWidth: 0,
            label: {
              show: labelShow,
              position: 'right',
              textStyle: {
                fontFamily: 'MicroSoft YaHei',
                fontSize: fontSize,
                fontStyle: 'normal'
              }
            }
          }
        },
        lineStyle: {
          width: 1,
          color: '#333'
        },
        children: [tamp]
      };
      return cnode;
    },
    animatieChart(myChart, targetX, targetY) {
      const self = this;
      targetX = targetX || 0;
      targetY = targetY || 0;
      var centerX = myChart.getZrender().getWidth() / 2;
      var centerY = myChart.getZrender().getHeight() / 2;
      var layer = myChart.getZrender().painter._layers['hover'];
      var animation = myChart.getZrender().animation;
      layer.scale = [0.2, 0.2, centerX, centerY];
      layer.rotation = [0, centerX, centerY];
      layer.position = [targetX, targetY];
      myChart.getZrender().render();
      animation
        .animate(layer)
        .when(400, {
          scale: [1, 1, centerX, centerY]
        })
        .start('spline')
        .done(function() {
          layer.scale[2] = 0;
          layer.scale[3] = 0;
        })
        .during(function() {
          myChart.getZrender().render();
        });
    },
    initTree(data) {
      const self = this;
      if (!data) return;
      data.name = data.Name;
      data.editable = false;
      data.labelClick = false;
      data.clickable = false;
      data.symbolSize = [data.name.length * 16 + 80, 52];
      data.symbol = 'rectangle';
      data.itemStyle = {
        normal: {
          color: '#fff',
          borderWidth: '1',
          borderColor: '#128bed',
          label: {
            show: !0,
            position: 'inside',
            textStyle: {
              color: '#000',
              fontFamily: 'MicroSoft YaHei',
              fontSize: 16,
              fontStyle: 'normal'
            }
          }
        },
        emphasis: {
          color: 'rgba(255,255,255,0)',
          borderWidth: '1',
          borderColor: '#128bed00'
        }
      };
      getNode(self.gudongData);
      getNode(self.touziData);

      function getNode(data) {
        if (!data) return;
        if (data.children) {
          for (var i = 0; i < data.children.length; i++) {
            getNode(data.children[i]);
          }
        }

        if (
          data.children &&
          data.children.length > 0 &&
          data.KeyNo &&
          data.KeyNo != self.getQueryString('keyNo')
        ) {
          data._children = data.children;
          data.children = null;
          data.extend = 1;
          //data.symbol = 'rectangle';
        }
      }
    },
    troggleTree(KeyNo, tid) {
      const self = this;
      // if(KeyNo==getQueryString("keyNo")){
      //     return;
      // }
      getNode(self.gudongData);
      getNode(self.touziData);
      function getNode(data) {
        if (!data) return;
        if (data.KeyNo && data.KeyNo == KeyNo && data.treeId == tid) {
          if (data.children) {
            data._children = data.children;
            data.children = null;
            data.extend = 1;
            //data.symbol = 'circleCross';
          } else if (data._children) {
            data.children = data._children;
            data._children = null;
            data.extend = 2;
            self.ajaxtouzidata(data, KeyNo);
            self.ajaxgudongdata(data, KeyNo);
            //data.symbol = 'circleMinus';
          }
          return;
        }
        if (data.children) {
          for (var i = 0; i < data.children.length; i++) {
            getNode(data.children[i]);
          }
        }
      }
      self.myChart.clear();
      self.myChart.setOption(self.option);
      self.initZrender();
    },
    editTree(KeyNo, tid) {
      const self = this;
      getNode(self.gudongData);
      getNode(self.touziData);
      var dnode;
      var dIndex;
      function getNode(data) {
        if (!data) return;
        if (data.children) {
          for (var i = 0; i < data.children.length; i++) {
            var cnode = data.children[i].children[0];
            if (cnode.treeId == tid) {
              dIndex = i;
              dnode = data;
              return;
            }
            getNode(cnode);
          }
        }
      }
      dnode.children.splice(dIndex, 1);
      if (dnode.children.length == 0) {
        dnode.children = [];
        dnode.extend = undefined;
      }
      self.myChart.clear();
      self.myChart.setOption(self.option);
      self.initZrender();
    },
    getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURIComponent(r[2]);
      return null;
    },
    ajaxtouzidata(node, KeyNo) {
      const self = this;
      if (!node.isTouzi || node.ajaxtouzi) {
        return;
      }
      const data = {
        touzi: node
      };
      data.touzi.DetailList = data.touzi.children;
      self.addTreeChild(node, data);
    },
    addTreeChild(node, data) {
      if (!node.children) {
        return;
      }
      const self = this;
      $.each(node.children, function(index, vo) {
        var cnode = vo.children[0];
        $.each(data.touzi.DetailList, function(i, ndata) {
          if (ndata.KeyNo == cnode.KeyNo) {
            if (ndata.DetailList.length > 0) {
              cnode.DetailList = ndata.DetailList;
              self.transTree(cnode, 2);
              cnode._children = cnode.children;
              cnode.children = null;
              cnode.extend = 1;
            }
          }
        });
      });
      node.ajaxtouzi = true;
      self.myChart.clear();
      self.myChart.setOption(self.option);
      self.initZrender();
    },
    //动态加载股东节点
    ajaxgudongdata(node, KeyNo) {
      const self = this;
      if (node.isTouzi || node.ajaxgudong) {
        return;
      }
      if (KeyNo == null) {
        return;
      }
      const data = {
        gudong: node
      };
      data.gudong.DetailList = data.gudong.children;
      if (data.gudong && data.gudong.DetailList.length > 0) {
        self.addGudongTreeChild(node, data);
      }
    },
    addGudongTreeChild(node, data) {
      const self = this;
      $.each(node.children, function(index, vo) {
        var cnode = vo.children[0];
        $.each(data.gudong.DetailList, function(i, ndata) {
          if (
            ndata.KeyNo == cnode.KeyNo &&
            ndata.Name.replace(/[^\X]/g, '') == cnode.Name.replace(/[^\X]/g, '')
          ) {
            if (ndata.DetailList.length > 0) {
              cnode.DetailList = ndata.DetailList;
              self.transTree(cnode, 1);
              cnode._children = cnode.children;
              cnode.children = null;
              cnode.extend = 1;
            }
          }
        });
      });
      node.ajaxgudong = true;
      self.myChart.clear();
      self.myChart.setOption(self.option);
      self.initZrender(false, '');
    }
  }
};
</script>
<style>
.mao-main {
  width: 100%;
}
</style>