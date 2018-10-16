<template>
    <div id="app">
        <vue-date :date-option="dateOption" @selectDay="selectDay" @selectMonth="selectMonth" @selectYear="selectYear"></vue-date>
    </div>
</template>

<script>
import vueDate from './vue-date.vue';

export default {
  name: 'app',
  components: {
    vueDate
  },
  mounted() {
    this.changeTheDate();
  },
  data() {
    return {
      dateOption: {
        name: '1111111',
        type: 'en',
        isShowToday: false, //是否显示返回今天的按钮
        dataList: [] //数据信息
      }
    };
  },
  methods: {
    /**
     * 模拟数据源信息 改变参数信息
     * * */
    changeTheDate() {
      const self = this;
      setTimeout(() => {
        self.$set(self, 'dateOption', {
          name: 222222,
          type: 'zh',
          isShowToday: true, //是否显示返回今天的按钮
          dataList: [
            {
              '2018-10-1': '1'
            },
            {
              '2018-10-3': '2'
            },
            {
              '2018-10-5': '3'
            },
            {
              '2018-10-7': '1,2'
            },
            {
              '2018-10-11': '2,3'
            }
          ]
        });
      }, 3000);
    },
    /**
     * 选择日的回调
     * * */
    selectDay(val) {
      console.log('选择日期的回调函数', val);
    },
    /**
     * 选择月份的回调
     * * */
    selectMonth(val) {
      console.log('选择月份的回调函数', val);
    },
    /**
     * 选择年的回调
     * * */
    selectYear(val) {
      console.log('选择年的回调的回调函数', val);
    }
  }
};
</script>

<style>
</style>
