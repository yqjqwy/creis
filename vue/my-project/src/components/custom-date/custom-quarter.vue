<template>
  <transition name="el-zoom-in-top">
    <div
      class="el-picker-panel el-date-picker el-popper"
      style="width:550px;height:550px;overflow: scroll;"
      v-show="visible"
    >
      <div class="el-picker-panel__body-wrapper">
        <div class="el-picker-panel__body">
          <div
            class="el-picker-panel__content"
            style="width: 90%;"
          >
            <table
              class="el-month-table"
              v-show="currentView === 'quarter'"
            >
              <tbody>
                <tr
                  v-for="(item,index) in createQuarterList"
                  :key="index"
                >
                  <!-- 年份 -->
                  <td>
                    <div>
                      <a v-text="item.year">第一季度</a>
                    </div>
                  </td>
                  <!-- 季度 -->
                  <td
                    :class="getStyle(ele,item)"
                    v-for="(ele,ind) in item.child"
                    :key="ind"
                  >
                    <div>
                      <a
                        class="cell"
                        v-text="ele.name"
                        @click="emitDate(ele,item)"
                      >第一季度</a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </transition>
</template>

<script>
import {
  prevYear,
  nextYear,
  isDate
} from 'element-ui/packages/date-picker/src/util/index.js';
import Locale from 'element-ui/src/mixins/locale';
//引入 配置信息表
import ConfigData from './config-data.js';

export default {
  name: 'custom-quarter',
  mixins: [Locale],
  props: {
    value: {}
  },
  data() {
    return {
      visible: false, //容器 状态
      date: new Date(),
      dataArr: [], //数据 数组
      currentView: 'quarter', //当前显示的组件
      thisVal: [] //数据存放
    };
  },
  components: {},
  watch: {
    value(newVal) {
      //   console.log('-----监听接受的值-----', newVal);
      const self = this;
      //   const theData = [...QUARTER_CONFIG];
      const theVal = newVal ? newVal.split('-') : [];
      self.thisVal = theVal;
      if (isDate(theVal[0])) {
        this.date = new Date(theVal[0]);
      } else {
        this.date = this.getDefaultValue();
      }
    }
  },
  mounted() {},
  computed: {
    year() {
      return this.date.getFullYear();
    },
    /***
     * 获取 当前年的文本
     * * */
    yearLabel() {
      const yearTranslation = this.t('el.datepicker.year');
      if (this.currentView === 'year') {
        const startYear = Math.floor(this.year / 10) * 10;
        if (yearTranslation) {
          return (
            startYear +
            ' ' +
            yearTranslation +
            ' - ' +
            (startYear + 9) +
            ' ' +
            yearTranslation
          );
        }
        return startYear + ' - ' + (startYear + 9);
      }
      return this.year + ' ' + yearTranslation;
    },
    /***
     * 生成季度列表信息
     * * */
    createQuarterList() {
      const self = this;
      //获取当前年 --- 本地日期
      const thisYear = parseFloat(new Date().getFullYear());
      //设定 最低年限
      const minYear = 1990;
      let theDataArr = [];

      for (let i = 0; i < thisYear - minYear + 1; i++) {
        const obj = {
          year: minYear + i,
          child: [
            {
              name: '第一季度'
            },
            {
              name: '第二季度'
            },
            {
              name: '第三季度'
            },
            {
              name: '第四季度'
            }
          ]
        };
        theDataArr.push(obj);
      }
      theDataArr.reverse();

      //   console.log(theDataArr);

      return theDataArr;
    }
  },
  methods: {
    getDefaultValue() {
      const self = this;
      const theVals = self.thisVal[0] || new Date();
      return theVals ? new Date(theVals) : new Date();
    },
    handleClear() {
      this.date = this.getDefaultValue();
      this.$emit('pick', null);
    },
    /**
     * 重置视图
     * * */
    resetView() {
      this.currentView = 'quarter';
    },
    /***
     * 向上发送信息
     * @param { Object } eleObj 当前点击元素的对象
     * @param { Object } itemObj 当前点击元素 的父级 对象
     * * */
    emitDate(eleObj, itemObj) {
      const self = this;
      const result = `${itemObj.year}.${
        ConfigData.QUARTER_CONFIG[eleObj.name].dateMin
      }-${itemObj.year}.${ConfigData.QUARTER_CONFIG[eleObj.name].dateMax}`;

      this.$emit('pick', result);
    },
    /***
     * 获取当前元素选中样式
     * @param { Object } eleObj 当前点击元素的对象
     * @param { Object } itemObj 当前点击元素 的父级 对象
     * */
    getStyle(eleObj, itemObj) {
      const self = this;
      let result = '';
      //拆分 传入的值
      const theVal = ConfigData.changeDefaultVal(self.value) || '';

      if (
        theVal.includes(String(eleObj.name)) &&
        theVal.includes(String(itemObj.year))
      ) {
        result = 'current';
      }

      return result;
    }
  }
};
</script>

<style>
</style>
