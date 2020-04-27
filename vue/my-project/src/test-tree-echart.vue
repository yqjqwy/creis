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
import { trueData } from './data/true-data';
// import './echarts2';
let treeId = 1;

var Text = require2('zrender/shape/Text');
var ImageShape = require2('zrender/shape/Image');
var Rectangle = require2('zrender/shape/Rectangle');

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

  //   CompanyCode: ""
  // DetailCount: 1
  // DetailList: []
  // KeyNo: "7a9c3ebfc4f47ec786d541d723ab1daf"
  // Level: 1
  // Name: "深圳市地铁集团有限公司"
  // Org: 0
  // Percent: "28.69%"
  // PercentTotal: "28.69%"
  // ShortStatus: "存续"
  // ShouldCapi: ""
  // StockRightNum: "3,242,810,791"

  mounted() {
    this.$nextTick(() => {
      this.myChart = chartTree.init(document.getElementById('main'));
      this.rootData = data;
      const { gudong, touzi } = data;
      this.gudongData = gudong;
      this.touziData = touzi;
      this.transTree(gudong, 1);
      this.initTree(gudong);
      this.transTree(touzi, 2);
      this.initTree(touzi);
      this.drawGuquan();

      this.changeData(trueData);
    });
  },
  methods: {
    /**
     * 数据处理 - 递归 生成树状数据信息
     * @param { Array } originData 数据源信息
     * * */
    changeData(originData) {
      const self = this;
      const baseObj = {
        enterpriseId: originData.enterpriseId,
        enterpriseName: originData.enterpriseName,
        enterpriseTycId: originData.enterpriseTycId,
        DetailList: []
      };
      const dataArr = [];
      // 股权 --- 向上
      originData.gudong = {
        ...baseObj
      };
      self.treeChangeData(originData.gudong, 'parentEnterpriseList');
      // 投资 --- 向下
      originData.touzi = {
        ...baseObj
      };
      self.treeChangeData(originData.touzi, 'childrenEnterpriseList');
      console.log(1111, originData);
    },
    /**
     * 进行 树状转化
     * @param { Object | Array } datas 数据源
     * @param { String } type 类型
     * * */
    treeChangeData(datas, type) {
      const self = this;
      // 数组的时候 循环处理
      if (Array.isArray(datas)) {
        datas.forEach(item => {
          self.getDataList(item, type);
        });
      } else {
        // 对象的时候 进行查找 然后  递归
        self.getDataList(datas, type);
      }
    },
    /**
     * 获取 对应的数据列表
     * @param { Object } datas 数据源
     * @param { String } type 类型
     * * */
    getDataList(datas, type) {
      const self = this;
      // 对象的时候 进行查找 然后  递归
      datas.DetailList = trueData[type].filter(
        item => item.enterpriseTycParentId === datas.enterpriseTycId
      );
      self.treeChangeData(datas.DetailList, type);
    },
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
          if (data.children && data.children.length > 0 && data.KeyNo) {
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
      if (data.Name.length > 20) {
        data.name = data.Name.substr(0, 19) + '…';
        data.ltext = true;
      } else {
        data.name = data.Name;
      }
      data.name = data.name.replace(/(.{10})(?=.)/g, '$1\n');

      // 通过 上级的 持股或者  下级的投资 来区分
      // 上级持股
      // if (data.StockRightNum) {
      //   data.subtext = '持股数：' + data.StockRightNum + '';
      // } else if (data.ShouldCapi) {
      //   // 投资下级
      //   data.subtext = '认缴金额：' + data.ShouldCapi;
      // }

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
          color: '#fff',
          borderWidth: '1',
          borderColor: '#ccc'
        }
      };

      var children = data.children;
      if (children) {
        for (var i = 0; i < children.length; i++) {
          self.transTree(children[i], type);
          children[i] = self.addTampArrow(children[i], fontSize);
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
        if (
          shapeList[i]._echartsData &&
          shapeList[i]._echartsData._data.subtext
        ) {
          shapeList[i].style.text = shapeList[i].style.text + '\n';
          var shapeY = shapeList[i].rotation[2] + 12;
          if (shapeList[i]._echartsData._data.name.length > 10) {
            shapeY = shapeList[i].rotation[2] + 16;
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
            }
            // highlightStyle: {
            //   lineWidth: 0,
            //   color: '#666',
            //   strokeColor: 'rgba(255,255,255,0)'
            // }
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

        if (data.children && data.children.length > 0 && data.KeyNo) {
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
      node.children.forEach((vo, index) => {
        var cnode = vo.children[0];
        data.touzi.DetailList.forEach((ndata, i) => {
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
      node.children.forEach((vo, index) => {
        var cnode = vo.children[0];
        data.gudong.DetailList.forEach((ndata, i) => {
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