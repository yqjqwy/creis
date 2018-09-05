<template>
  <div>
    <!-- 区域选择弹窗 begin-->
    <div class="pop-select-content">
      <ul class="nav nav-tabs nav-tabs-n01">
        <li ttype="district" :class="{active:active=='district'}" v-if="params.district.flag">
          <a href="javascript:;" data-toggle="tab" @click="changeTab('district')">区县</a>
        </li>
        <li ttype="board" :class="{active:active=='board'}" v-if="params.board.flag">
          <a href="javascript:;" data-toggle="tab" @click="changeTab('board')">板块</a>
        </li>
        <li ttype="street" :class="{active:active=='street'}" v-if="params.street.flag">
          <a href="javascript:;" data-toggle="tab" @click="changeTab('street')">街道</a>
        </li>
      </ul>
      <div class="tab-content clearfix">
        <!-- 市内区县 县级市 begin-->
        <div class="distric_part" v-for="(item,index) in dataOption" :key="index">
          <div class="butbox clearfix">
            <span class="fl gray9" v-text="item.name||''"></span>
            <span class="blue01 all-checkall" name="checkalldistrict" style="cursor:pointer;" @click="selAll(item)">全选</span>
            <span class="blue01">&nbsp;|&nbsp;</span>
            <span class="blue01 all-cancelall" name="cancelalldistrict" style="cursor:pointer;" @click="reverseSel(item)">反选</span>
          </div>
          <!-- 区县板块街道内容板块 begin-->
          <ul class="areaL no-padding no-margin">
            <li v-for="(ele,ind) in item.arr" :key="ind">
              <!-- 区县 start-->
              <div class="tabbox clearfix">
                <a v-for="(element,eleind) in ele" :key="eleind" href="javascript:;" :title="element.sName" :class="{on:selectDisId == element.sID}">
                  <!-- 板块街道 -->
                  <em class="check" :class="{'sm-checked':element.flag == 1 , 'checked':element.flag == 2}" @click="selectNext(element)"></em>
                  <!-- 板块街道 -->
                  <span @click="secletDistrict(element)">{{ element.sName }}</span>
                </a>
              </div>
              <!-- 区县 end-->
              <!-- 板块街道部分 start-->
              <div v-for="(element,eleind) in ele" :key="eleind" class="sub-content" v-if="active == 'board'" v-show="selectDisId == element.sID">
                <div class="sub-cnt-list">
                  <dl class="clearfix">
                    <dt class="clearfix">
                      <span class="blue01">
                        <span style="cursor:pointer;" name="selectall" ptype="board" @click="bSSelAll(element)">全选</span>&nbsp;|&nbsp;
                        <span style="cursor:pointer;" name="cancelall" pvalue="密云区" ptype="board" @click="bSReverse(element)">反选</span>
                      </span>
                    </dt>
                    <dd class="clearfix">
                      <a href="javascript:;" v-for="(detail,num) in element.boardDetail" :key="num" :title="detail.sName" @click="changeDetailItem(detail,element)">
                        <em class="check" :class="{checked:detail.flag == 2}"></em>{{ detail.sName }}
                      </a>
                    </dd>
                  </dl>
                </div>
              </div>
              <!-- 板块街道部分 end-->
              <!-- 板块街道部分 start-->
              <div v-for="(element,eleind) in ele" :key="eleind" class="sub-content" v-if="active == 'street'" v-show="selectDisId == element.sID">
                <div class="sub-cnt-list">
                  <dl class="clearfix">
                    <dt class="clearfix">
                      <span class="blue01">
                        <span style="cursor:pointer;" name="selectall" ptype="board" @click="bSSelAll(element)">全选</span>&nbsp;|&nbsp;
                        <span style="cursor:pointer;" name="cancelall" pvalue="密云区" ptype="board" @click="bSReverse(element)">反选</span>
                      </span>
                    </dt>
                    <dd class="clearfix">
                      <a href="javascript:;" v-for="(detail,num) in element.streetDetail" :key="num" :title="detail.sName" @click="changeDetailItem(detail,element)">
                        <em class="check" :class="{checked:detail.flag == 2}"></em>{{ detail.sName }}
                      </a>
                    </dd>
                  </dl>
                </div>
              </div>
              <!-- 板块街道部分 end-->
            </li>
          </ul>
          <!-- 区县板块街道内容板块 end-->
        </div>
        <!-- 市内区县 县级市 end-->
      </div>
      <!-- 按钮 begin-->
      <div class="butbox butbox_padd text-center clearfix" style="">
        <a href="javascript:;" class="but_cancel mr05" tname="cancel" @click="cancelBut">取消</a>
        <a href="javascript:;" class="but_confirm " tname="sure" @click="confirmBut">确定</a>
      </div>
      <!-- 按钮 end-->
    </div>
    <!-- 区域选择弹窗 end-->
  </div>
</template>
<script>
import utils from "yjy-commonjs/src/utils";
// const data = require("../data/data");
export default {
  name: "area-selection",
  props: {
    data: {
      type: Object,
      default() {
        return new Object();
      }
    },
    dimensions: {
      type: Array,
      default() {
        return ["district", "board", "street"];
      }
    },
    value: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      //保存数据源
      dataArr: {},
      //区县板块街道切换的标签 district  board  street
      active: "district",
      //绑定列表数据
      dataOption: [],
      //选中区县的id
      selectDisId: "",
      //存放上一个选中的板块
      prevBoard: {},
      //根据状态不同的参数
      params: {
        district: {
          dimension: "district",
          //返回出去的选中数据
          data: [],
          //存放板块数据街道的数组 --- 切换时刷新视图的
          myDatas: [],
          flag: utils.Array.contains(this.dimensions, "district") //是否显示的状态
        },
        board: {
          dimension: "board",
          //存放详情的数组
          detail: "boardDetail",
          data: [],
          myDatas: [],
          flag: utils.Array.contains(this.dimensions, "board") //是否显示的状态
        },
        street: {
          dimension: "street",
          //存放详情的数组
          detail: "streetDetail",
          data: [],
          myDatas: [],
          flag: utils.Array.contains(this.dimensions, "street") //是否显示的状态
        }
      }
    };
  },
  methods: {
    /**
     * 切换区县板块街道的标签
     * * */
    changeTab(str) {
      let self = this;
      //修改data中的状态
      self.active = str;
      //筛选数据源 改变数据的状态
      //刷新视图
      self.$set(self, "dataOption", self.params[self.active].myDatas);
      //清空存放区县id的变量
      self.selectDisId = "";
    },
    /**
     * 数据处理
     * * */
    dataDispose(myData) {
      let self = this;
      //筛选区县数据
      let districtArr = myData.CityMap_Dimension.filter(item => {
        return item.sType == "区县";
      });

      //筛选板块数据
      let boardArr = myData.CityMap_Dimension.filter(item => {
        return item.sType == "板块";
      });
      //筛选街道数据
      let streetArr = myData.CityMap_Dimension.filter(item => {
        return item.sType == "街道";
      });

      //循环区县数据 查找对应的关系
      districtArr.forEach(item => {
        //筛选板块数据
        item.boardArr = myData.CityMap_DimensionRelation.filter(ele => {
          return ele.sChildType == "板块" && item.sID == ele.sDimensionID;
        });
        //筛选街道数据
        item.streetArr = myData.CityMap_DimensionRelation.filter(ele => {
          return ele.sChildType == "街道" && item.sID == ele.sDimensionID;
        });
      });

      //查找具体的板块区县信息
      districtArr.forEach(item => {
        //板块详情
        item.boardDetail = [];
        //街道详情
        item.streetDetail = [];
        //循环板块列表
        item.boardArr.forEach(ele => {
          //查询对应的数据
          //筛选板块数据
          let boardObj = boardArr.filter(objItem => {
            return ele.sChildDimensionID == objItem.sID;
          });
          item.boardDetail.push(boardObj[0]);
        });

        //循环街道列表
        item.streetArr.forEach(ele => {
          let streetObj = streetArr.filter(objItem => {
            return ele.sChildDimensionID == objItem.sID;
          });
          item.streetDetail.push(streetObj[0]);
        });
      });

      //筛选所有sGrade

      let grades = {};
      districtArr.forEach(element => {
        let grade = element.sGrade || "default";
        grades[grade] = grades[grade] || [];
        grades[grade].push(element);
      });

      let myArr = [];

      let columnCount = 3;
      for (let key in grades) {
        let data = {
          name: key == "default" ? "" : key,
          arr: []
        };

        let count = (grades[key].length - 1) / columnCount + 1;
        for (let i = 0; i < count; i++) {
          let max = (i + 1) * columnCount;
          if (max > grades[key].length) max = grades[key].length;

          let arr = [];
          for (let k = i * columnCount; k < max; k++) {
            arr.push(grades[key][k]);
          }

          data.arr.push(arr);
        }
        myArr.push(data);
      }

      //console.log(myArr);
      //保存 数据
      for (let i in self.params) {
        let datas = utils.Object.extend(true, [], myArr);
        self.$set(self.params[i], "myDatas", datas);
      }
      //刷新视图
      self.$set(self, "dataOption", self.params[self.active].myDatas);
    },
    /**
     * 选中区县的下一级
     * ** */
    selectNext(element) {
      let self = this;
      //修改此元素的状态
      if (element.flag == 0) {
        element.flag = 2;
      } else {
        element.flag = 0;
      }
      if (self.active != "district") {
        let flags = 0;
        if (element.flag != 0) {
          flags = 2;
        }
        //修改全选和全部不选的状态
        element[self.params[self.active].detail].forEach(item => {
          item.flag = flags;
        });
      }
    },
    /**
     * 选中区县
     * ** */
    secletDistrict(element) {
      let self = this;

      if (self.active != "district") {
        let flags = false;
        if (element.flag != 0) {
          flags = true;
        }
        if (element.sID == self.selectDisId) {
          //清空
          self.selectDisId = "";
        } else {
          //保存点击的区县id
          self.selectDisId = element.sID;
        }

        ////console.log(element);
      } else {
        //修改此元素的状态
        if (element.flag == 0) {
          element.flag = 2;
        } else {
          element.flag = 0;
        }
      }
    },
    /**
     * 区县全选
     * * */
    selAll(item) {
      let self = this;
      //循环数据
      item.arr.forEach(ele => {
        ele.forEach(a => {
          a.flag = 2;
          //非区县的时候 选中下一级
          if (self.active != "district") {
            //修改全选和全部不选的状态
            a[self.params[self.active].detail].forEach(b => {
              b.flag = a.flag;
            });
          }
        });
      });
    },
    /**
     * 区县反选
     * * */
    reverseSel(item) {
      let self = this;
      //循环数据
      item.arr.forEach(ele => {
        ele.forEach(a => {
          if (a.flag == 2) {
            //将选择改为不选
            a.flag = 0;
          } else if (a.flag == 0) {
            //将不选改为选择
            a.flag = 2;
          } else {
            //依旧是半选
            a.flag = 1;
          }
          //非区县的时候 选中下一级
          if (self.active != "district") {
            //修改全选和全部不选的状态
            a[self.params[self.active].detail].forEach(b => {
              if (b.flag == 0) {
                b.flag = 2;
              } else {
                b.flag = 0;
              }
            });
          }
        });
      });
    },
    /**
     * 板块街道单独选择
     * * */
    changeDetailItem(detail, element) {
      let self = this;

      //判断父节点
      let num = 0;
      element[self.params[self.active].detail].forEach((item, index) => {
        if (item.sID == detail.sID) {
          //修改当前状态3
          if (item.flag != 0) {
            item.flag = 0;
          } else {
            item.flag = 2;
          }
        }
        //假如有一个选中
        if (item.flag == 2) {
          num = num + 1;
        }
      });

      if (num == 0) {
        //全部不选中的状态
        element.flag = 0;
      } else if (
        num > 0 &&
        num < element[self.params[self.active].detail].length
      ) {
        //部分选中的时候
        element.flag = 1;
      } else {
        //全选
        element.flag = 2;
      }
    },
    /***
     * 板块街道全选
     * * */
    bSSelAll(element) {
      let self = this;
      //将所有的子节点都设成选中 并且 父节点设成选中
      element[self.params[self.active].detail].forEach(item => {
        item.flag = 2;
      });
      //设置父节点选中
      element.flag = 2;
    },

    /**
     * 板块街道反选
     * ** */
    bSReverse(element) {
      let self = this;
      /**
       * 1.判断子节点是否全部选中 如果是 那么改为全部不选 并且父节点不选
       * 2.判断子节点是否全部没选中  如果是  那么改为全部选中 父节点选中
       * 3.判断子节点是否有没选中 如果是  全部取反  父节点取部分选中
       * * */
      let num = 0;
      element[self.params[self.active].detail].forEach((item, index) => {
        //全部取反
        if (item.flag == 0) {
          item.flag = 2;
          num = num + 1;
        } else {
          item.flag = 0;
        }
      });

      if (num == 0) {
        //全部不选中的状态
        element.flag = 0;
      } else if (
        num > 0 &&
        num < element[self.params[self.active].detail].length
      ) {
        //部分选中的时候
        element.flag = 1;
      } else {
        //全选
        element.flag = 2;
      }
    },
    /**
     * 取消
     * * */
    cancelBut() {
      let self = this;
      //拷贝对象
      let myObj = utils.Object.extend(true, {}, self.params[self.active]);
      //删除不必要的属性
      delete myObj.data;
      delete myObj.detail;
      delete myObj.myDatas;
      delete myObj.flag;

      //传值
      self.$emit("input", myObj);
      //取消的状态
      self.$emit("cancel", true);
    },
    /**
     * 确定
     * * */
    confirmBut() {
      let self = this;
      let myFlag = 0; //0 ：区县 1 ： 板块街道
      //拷贝数据
      let myDataArr = utils.Object.extend(true, [], self.dataOption);
      //设置空数组 放置选中的元素
      let arr = [];
      //区县的时候
      if (self.active == "district") {
        myFlag = 0;
      } else {
        myFlag = 1;
      }

      //清空对应的数据
      self.$set(self.params[self.active], "data", []);

      //筛选出对应的数据 然后向上发送
      myDataArr.forEach(a => {
        a.arr.forEach(b => {
          b.forEach(item => {
            //区县的时候
            if (myFlag == 0) {
              if (item.flag == 2) {
                //删除多余属性
                delete item.boardArr;
                delete item.boardDetail;
                delete item.streetArr;
                delete item.streetDetail;
                self.params[self.active].data.push(item);
              }
            } else {
              // 其他的时候
              item[self.params[self.active].detail].forEach(ele => {
                if (ele.flag == 2) {
                  self.params[self.active].data.push(ele);
                }
              });
            }
          });
        });
      });
      ////console.log(self.params[self.active].data);
      //拷贝数据
      let myObj = utils.Object.extend(true, {}, self.params[self.active]);
      //删除不必要的属性
      delete myObj.detail;
      delete myObj.myDatas;
      delete myObj.flag;

      self.$emit("input", myObj);
      //确定的状态
      self.$emit("confirm", true);
    },
    /**
     * 显示与隐藏切换
     * * */
    isShowOrHide(newVal) {
      let self = this;
      //初始化 --- 全部隐藏
      for (let i in self.params) {
        self.params[i].flag = false;
      }
      //如果传入 那么按需显示  如果没有  那么全部显示
      if (newVal.length > 0) {
        newVal.forEach(item => {
          self.params[item].flag = true;
        });
      } else {
        //全部显示
        for (let i in self.params) {
          self.params[i].flag = true;
        }
      }

      //作为标识 只取第一次
      let sum = 0;

      //全部显示
      for (let i in self.params) {
        if (self.params[i].flag && sum == 0) {
          //修改标识符
          sum++;
          //修改data中的状态
          self.active = i;
          //筛选数据源 改变数据的状态
          //刷新视图
          self.$set(self, "dataOption", self.params[i].myDatas);
          //清空存放区县id的变量
          self.selectDisId = "";
        }
      }
    }
  },
  mounted() {
    //切换显示隐藏
    this.isShowOrHide(this.dimensions);
  },
  watch: {
    //监听传入数据源的变化
    data(newVal, oldVal) {
      let self = this;
      //当传入数据不变的时候
      if (newVal) {
        //保存数据
        let myData = newVal;
        //获取数据源 发起请求
        // let myData = data.data;
        ////console.log(myData);
        //循环数据 添加状态属性
        myData.CityMap_Dimension.forEach(item => {
          //是否选中的状态 0不选 1半选 2全选
          item.flag = 0;
        });
        //保存数据源
        self.$set(self, "dataArr", myData);
        self.dataDispose(myData);
      }
    },
    //检测编辑的数据
    value(newVal, oldVal) {
      //console.log(newVal);
      let self = this,
        theActive = newVal.dimension;
      if (newVal && newVal.data) {
        //修改状态
        self.active = theActive;
        //循环数据 进行比对 -- 区县的时候 特殊处理
        self.params[theActive].myDatas.forEach(a => {
          a.arr.forEach(b => {
            b.forEach(item => {
              //区县一级
              //判断是否循环下一级
              if (theActive != "district") {
                let sum = 1;
                //板块街道的时候 循环下一级
                item[self.params[theActive].detail].forEach(ele => {
                  //循环编辑的数据 进行对比
                  newVal.data.forEach(edit => {
                    //修改当前板块街道的状态
                    if (edit == ele.sID) {
                      //修改为选中状态
                      ele.flag = 2;
                      sum = sum + 1;
                    }
                    //部分选中
                    if (
                      sum > 1 &&
                      sum < item[self.params[theActive].detail].length
                    ) {
                      item.flag = 1;
                    } else if (
                      sum == item[self.params[theActive].detail].length
                    ) {
                      //全部选中
                      item.flag = 2;
                    }
                  });
                });
              } else {
                newVal.data.forEach(edit => {
                  //id相等的时候修改其状态
                  if (edit == item.sID) {
                    //修改为选中状态
                    item.flag = 2;
                  }
                });
              }
            });
          });
        });

        //刷新视图
        self.$set(self, "dataOption", self.params[theActive].myDatas);
      }
    },
    //判断传入的显示与隐藏的指标
    dimensions(newVal, oldVal) {
      //切换显示隐藏
      this.isShowOrHide(newVal);
    }
  }
};
</script>
<style>
/* 区县板块选择 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
*:focus {
  outline: none;
}
body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  color: #333;
  background-color: #dddfe2;
  font-size: 12px;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}
ul,
li,
dl,
dt,
dd,
p,
h1,
h2,
h4,
h3,
h5,
h6 {
  list-style: none;
  padding: 0;
  margin: 0;
  font-weight: normal;
}
.fl,
.pull-left {
  float: left;
}
.fr,
.pull-right {
  float: right;
}
.clearfix:after {
  clear: both; /* 清除浮动 */
  display: block;
  visibility: hidden; /* 设置伪类层内容块级不可见 */
  height: 0;
  line-height: 0; /* 高度和行高为0 */
  content: ""; /* 将伪类层内容清空 */
}
.clearfix {
  zoom: 1;
}
.text-center {
  text-align: center;
}
/* 颜色 */
.gray9 {
  color: #999ea1;
}
.blue01 {
  color: #2896ea;
}
a {
  outline: none;
  text-decoration: none;
  color: #333;
}
a:hover,
a:focus {
  text-decoration: none;
}
.pop-select-content {
  width: 270px;
  background-color: #fff;
}
.nav-tabs-n01 {
  margin: 5px 0px;
  border-bottom: 1px solid #eeeeee;
  height: 30px;
}
.nav-tabs-n01 li {
  text-align: center;
  float: left;
  padding: 0 0px 0 15px;
}
.nav-tabs-n01 > li > a {
  display: block;
  border: 0;
  height: 30px;
  line-height: 30px;
  padding: 0px 4px;
  background: transparent;
  font-size: 12px;
  color: #333;
}
.nav-tabs-n01 > li > a:focus {
  background-color: transparent;
  cursor: pointer;
}
.nav-tabs-n01 > li > a:hover,
.nav-tabs-n01 > li > a:active,
.nav-tabs-n01 > li.active > a,
.nav-tabs-n01 > li.active > a:hover,
.nav-tabs-n01 > li.active > a:focus,
.nav-tabs-n01 > li.active > a:active {
  color: #2896ea;
  text-decoration: none;
  border-bottom: 2px solid #2896ea;
  font-weight: bold;
}
.tab-content {
  max-height: 360px;
  overflow: auto;
}
.tab-content .butbox {
  text-align: right;
  padding: 0 15px;
}
.areaL li {
  min-height: 30px;
  line-height: 30px;
  position: relative;
}
.areaL li .tabbox {
  padding-left: 15px;
}
.areaL li .tabbox > a {
  display: block;
  padding: 0px 8px 0 0;
  font-size: 12px;
  color: #333;
  line-height: 30px;
  text-decoration: none;
  width: 33.3%;
  float: left;
  position: relative;
}
.areaL li .tabbox > a::before {
  content: "";
  display: none;
  width: 0;
  height: 0;
  border-width: 6px;
  border-style: solid;
  border-color: transparent transparent #edeff1 transparent;
  position: absolute;
  bottom: -1px;
  left: 33%;
}
.areaL li .tabbox > a.on::before {
  display: block;
}
.areaL li .tabbox > a > span {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  max-width: 73%;
}
.distric_part {
  border-bottom: 1px dashed #e0e0e0;
  padding-bottom: 5px;
}
.distric_part:last-child {
  border-bottom: 0;
}
.sub-content {
  width: 100%;
  height: auto;
  padding: 5px 0px 5px 15px;
  background: #edeff1;
}
.sub-cnt-list dt {
  height: 28px;
  line-height: 28px;
  font-size: 12px;
  font-weight: normal;
  padding: 0 10px;
}
.sub-cnt-list dd a {
  float: left;
  display: inline;
  padding: 0 8px 0 0;
  color: #333;
  font-size: 12px;
  text-decoration: none;
  line-height: 24px;
  width: 33.3%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.check,
.radio {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: url(./images/check-skin.png) -1px -1px no-repeat;
  vertical-align: middle;
  margin: 0 3px 0 0;
  cursor: pointer;
}
.radio {
  background-position: -97px -1px;
}
.checked {
  background-position: -33px -1px;
}
.radio.checked {
  background-position: -131px -1px;
}
.check.forbid {
  background-image: none;
  background-color: #dedede;
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: not-allowed;
}
.radio.forbid {
  background-image: none;
  background-color: #dedede;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: not-allowed;
}
.sm-checked {
  background-position: -65px -1px;
}
.butbox_padd {
  padding: 10px;
}
.butbox {
  font-size: 12px;
  line-height: 28px;
  color: #2333;
}
.butbox a,
.but_confirm {
  display: inline-block;
  height: 28px;
  line-height: 28px;
  padding: 0 15px;
  border-radius: 2px;
  font-size: 12px;
  color: #fff;
  text-decoration: none;
  background: #2896ea;
  vertical-align: middle;
}
.but_confirm:hover,
.but_confirm:focus {
  color: #fff;
  text-decoration: none;
}
.butbox a.but_cancel,
.butbox .but_cancel {
  vertical-align: middle;
  background: #abafb2;
  color: #fff;
  border: 0;
}
</style>
