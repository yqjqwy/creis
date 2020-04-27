<template>
  <transition name="el-zoom-in-top">
    <div
      class="el-picker-panel el-date-picker el-popper"
      v-show="visible"
    >
      <div class="el-picker-panel__body-wrapper">
        <div class="el-picker-panel__body">
          <!-- <div class="el-date-picker__time-header"> -->
          <!-- <span class="el-date-picker__editor-wrap">
              <el-input
                :placeholder="t('el.datepicker.selectDate')"
                :value="visibleDate"
                size="small"
                @input="val => userInputDate = val"
                @change="handleVisibleDateChange" />
            </span> -->
          <!-- <span class="el-date-picker__editor-wrap" v-clickoutside="handleTimePickClose">
              <el-input
                ref="input"
                @focus="timePickerVisible = true"
                :placeholder="t('el.datepicker.selectTime')"
                :value="visibleTime"
                size="small"
                @input="val => userInputTime = val"
                @change="handleVisibleTimeChange" />
              <time-picker
                ref="timepicker"
                :time-arrow-control="arrowControl"
                @pick="handleTimePick"
                :visible="timePickerVisible"
                @mounted="proxyTimePickerDataProperties">
              </time-picker>
            </span> -->
          <!-- </div> -->
          <div class="el-date-picker__header el-date-picker__header--bordered">
            <button
              type="button"
              @click="prevYear"
              :aria-label="t(`el.datepicker.prevYear`)"
              class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
            >
            </button>
            <span
              @click="showYearPicker"
              role="button"
              class="el-date-picker__header-label"
            >{{ yearLabel }}</span>
            <button
              type="button"
              @click="nextYear"
              :aria-label="t(`el.datepicker.nextYear`)"
              class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"
            >
            </button>
          </div>

          <div class="el-picker-panel__content">
            <year-table
              v-show="currentView === 'year'"
              @pick="handleYearPick"
              :value="getDefaultValue()"
              :default-value="new Date()"
              :date="date"
            >
            </year-table>
            <table
              class="el-month-table"
              v-show="currentView === 'quarter'"
            >
              <tbody>
                <tr
                  v-for="(item,index) in createQuarterList"
                  :key="index"
                >
                  <td :class="item.class">
                    <div>
                      <a
                        @click="emitDate(item)"
                        class="cell"
                        v-text="item.name"
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
const QUARTER_CONFIG = [
  {
    name: '第一季度',
    class: '', // 渲染的  class  today:当前月份所在季度  current:当前选中的季度--默认值
    containMonth: '1,2,3' //当前季度 所包含的月份
  },
  {
    name: '第二季度',
    class: '',
    containMonth: '4,5,6'
  },
  {
    name: '第三季度',
    class: '',
    containMonth: '7,8,9'
  },
  {
    name: '第四季度',
    class: '',
    containMonth: '10,11,12'
  }
];

import {
  prevYear,
  nextYear,
  isDate
} from 'element-ui/packages/date-picker/src/util/index.js';
import Locale from 'element-ui/src/mixins/locale';
import YearTable from 'element-ui/packages/date-picker/src/basic/year-table';

export default {
  name: 'data-quarter',
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
  components: {
    YearTable
  },
  watch: {
    value(newVal) {
      console.log('-----监听接受的值-----', newVal);
      const self = this;
      //   const theData = [...QUARTER_CONFIG];
      const theVal = newVal ? newVal.split('-') : [];
      self.thisVal = theVal;
      if (isDate(theVal[0])) {
        this.date = new Date(theVal[0]);
      } else {
        this.date = this.getDefaultValue();
      }
      //   //置空当前选中的元素
      //   theData.forEach(item => {
      //     item.class = item.class.replace('current', '');
      //   });
      //   //获取本月
      //   const thisMonth = parseFloat(new Date().getMonth()) + 1;
      //   const theItemMonth = theData.find(item =>
      //     item.containMonth.includes(thisMonth)
      //   );
      //   if (theItemMonth && !theItemMonth.class.includes('today'))
      //     theItemMonth.class += 'today ';
      //   //选中当前的值
      //   const theItem = theData.find(item => item.name === theVal[1] || '');
      //   if (theItem && !theItem.class.includes('current'))
      //     theItem.class += 'current ';
      //   self.$set(self, 'dataArr', theData);
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
      const thisYear = new Date().getFullYear();
      //获取 此时选中值的年份 --- 可切换的  显示的年份
      const defaultYear = self.year;
      const theDates = [...QUARTER_CONFIG];
      //接受的值
      const theVal = self.value ? self.value.split('-') : [];
      //传入的值的年份
      const selectYear = theVal[0] || new Date().getFullYear();
      //获取本月
      const thisMonth = parseFloat(new Date().getMonth()) + 1;

      //重置 数据
      theDates.forEach(item => {
        item.class = '';
      });

      //当 顶部可切换的年份  等于  传入的值的年份  添加  current
      if (String(defaultYear) === String(selectYear)) {
        const theItem = theDates.find(item => item.name === theVal[1] || '');
        if (theItem && !theItem.class.includes('current'))
          theItem.class += 'current ';
      }

      //当 本地年份  等于  传入的值的年份的时候  默认添加  当前月份所在季度的默认选中  today
      if (String(thisYear) === String(defaultYear)) {
        const theItemMonth = theDates.find(item =>
          item.containMonth.includes(thisMonth)
        );
        if (theItemMonth && !theItemMonth.class.includes('today'))
          theItemMonth.class += 'today ';
      }

      return theDates;
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
     * 打开 年份选择弹框
     * * */
    showYearPicker() {
      this.currentView = 'year';
    },
    /**
     * 上一年
     * * */
    prevYear() {
      if (this.currentView === 'year') {
        this.date = prevYear(this.date, 10);
      } else {
        this.date = prevYear(this.date);
      }
    },
    /***
     * 下一年
     * * */
    nextYear() {
      if (this.currentView === 'year') {
        this.date = nextYear(this.date, 10);
      } else {
        this.date = nextYear(this.date);
      }
    },
    /***
     * 年份选择的回调
     * * */
    handleYearPick(year) {
      console.log('年份选中', year);
      const self = this;
      //修改 date
      self.date = new Date(String(year));

      self.currentView = 'quarter';
    },
    /**
     * 重置视图
     * * */
    resetView() {
      this.currentView = 'quarter';
    },
    /***
     * 向上发送信息
     * * */
    emitDate(itemObj) {
      const self = this;
      this.$emit('pick', `${self.year}-${itemObj.name}`);
    }
  }
};
</script>

<style>
</style>
