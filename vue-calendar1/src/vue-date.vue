<template>
    <div class="calendar_flex">
        <div>
            <calendar ref="calendarOptions" :events="calendarOptions.events" :lunar="calendarOptions.lunar" :value="calendarOptions.value" :begin="calendarOptions.begin" :end="calendarOptions.end" :weeks="calendarOptions.weeks" :months="calendarOptions.months" @select="calendarOptions.select" @selectMonth="calendarOptions.selectMonth" @selectYear="calendarOptions.selectYear"></calendar>
            <!-- <button @click="changeEvents">异步更新Price</button> -->
            <!-- <button @click="calendarOptions.value=[2018,1,Math.floor(Math.random()*30+1)]">动态设置日期</button> -->
            <button v-show="customOptions.isShowToday" @click="$refs.calendarOptions.setToday()">返回今天</button>
        </div>
    </div>
</template>

<script>
import calendar from './calendar.vue';
import configDatas from './date-config.js';

export default {
  name: 'vue-date',
  props: {
    //接收传递的参数对象
    dateOption: {
      type: Object,
      default: {}
    }
  },
  components: {
    calendar
  },
  data() {
    return {
      /**
       * 日历控件的原始配置参数信息
       * * */
      calendarOptions: {
        value: [2017, 7, 20], //默认日期
        // lunar:true, //显示农历
        weeks: [
          '星期日',
          '星期一',
          '星期二',
          '星期三',
          '星期四',
          '星期五',
          '星期六'
        ],
        months: [
          '一月',
          '二月',
          '三月',
          '四月',
          '五月',
          '六月',
          '七月',
          '八月',
          '九月',
          '十月',
          '十一月',
          '十二月'
        ],
        events: {
          '2018-10-7': `<span class="calender_icon calender_deal_icon">1</span><span class="calender_icon calender_deal_icon">1</span>`,
          '2018-10-20':
            '<span class="calender_icon calender_push_icon">2</span>',
          '2018-10-1': '<span class="calender_icon calender_push_icon">3</span>'
        },
        // select(value) {
        //     console.log('选择日期', value, value.toString());
        // //   this.$emit('selectDay', [value, value.toString()]);
        // },
        select: value => {
          //   console.log('选择日期', value, value.toString());
          this.$emit('selectDay', [value.toString()]);
        },
        selectMonth: (month, year) => {
          //   console.log('选择月份', year, month);
          this.$emit('selectMonth', [year, month]);
        },
        selectYear: year => {
          //    console.log('选择年', year);
          this.$emit('selectYear', [year]);
        },
        timestamp: Date.now()
      },
      /**
       * 传入的配置参数信息
       * * */
      customOptions: {
        name: '1111111',
        type: 'zh', //类别
        isShowToday: true, //是否显示返回今天的按钮
        dataList: [] //数据信息
      },
      /**
       * 数据配置信息
       * * */
      dateOptions: {
        //日期图标
        dateIcon: {},
        //星期和月份的中英文
        dateType: {}
      }
    };
  },
  methods: {
    openByDrop(e) {
      this.calendar3.show = true;
      this.calendar3.left = e.target.offsetLeft + 19;
      this.calendar3.top = e.target.offsetTop + 70;

      e.stopPropagation();
      window.setTimeout(() => {
        document.addEventListener(
          'click',
          e => {
            this.calendar3.show = false;
            document.removeEventListener('click', () => {}, false);
          },
          false
        );
      }, 1000);
    },
    openByDialog() {
      this.calendar4.show = true;
    },
    closeByDialog() {
      this.calendar4.show = false;
    },
    openMultiByDrop(e) {
      this.calendar5.show = true;
      this.calendar5.left = e.target.offsetLeft + 19;
      this.calendar5.top = e.target.offsetTop + 70;
      e.stopPropagation();
      window.setTimeout(() => {
        document.addEventListener(
          'click',
          e => {
            this.calendar5.show = false;
            document.removeEventListener('click', () => {}, false);
          },
          false
        );
      }, 1000);
    },
    changeEvents() {
      this.calendarOptions.events = {
        '2017-7-20': '$' + ((Math.random() * 1000) >> 0),
        '2017-7-21': '$' + ((Math.random() * 1000) >> 0),
        '2017-7-22': '$' + ((Math.random() * 1000) >> 0)
      };
    },
    /**
     * 动态获取近半年时间信息
     * * */
    getNewDate() {
      //获取当前时间
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = month < 10 ? '0' + month : month;
      var strDate = date.getDate();
      //获取6个月前信息
      var date1 = new Date();
      date1.setMonth(date1.getMonth() - 6);
      var year1 = date1.getFullYear();
      var month1 = date1.getMonth() + 1;
      month1 = month1 < 10 ? '0' + month1 : month1;
      var strDates = date.getDate();
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
        strDates = '0' + strDates;
      }
      let eDate = [year.toString(), month.toString(), strDate.toString()];
      return eDate;
    },
    /**
     * 初始化日期控件
     * theDate : 传递的配置项信息
     * * */
    initDate(theDate) {
      const self = this;
      let theOptions = { ...theDate };

      //根据数据处理 与图标联动
      let dataObjs = {};
      //循环数据信息 拼接数据
      theOptions.dataList.forEach(item => {
        //取键值
        let keys = Object.keys(item)[0];
        //取值
        let values = item[keys];
        let str = '';
        //将值得字符串转化为数组 拼接对应的图标html代码片段
        values.split(',').forEach(element => {
          str += self.dateOptions.dateIcon[element];
        });
        //拼接键值
        dataObjs = { ...dataObjs, [keys]: str };
      });
      //保存参数
      self.$set(self, 'customOptions', theOptions);
      //修改配置项信息
      //   self.calendarOptions.events = dataObjs;
      self.$set(self.calendarOptions, 'events', dataObjs);
      //改变日历类型
      ['weeks', 'months'].forEach(item => {
        self.$set(
          self.calendarOptions,
          item,
          self.dateOptions.dateType[theOptions.type || 'zh'][item]
        );
      });
      //修改日历的图标显示
      self.$set(self.calendarOptions, 'events', dataObjs);
    }
  },
  mounted() {
    const self = this;
    //保存配置文件信息
    ['dateIcon', 'dateType'].forEach(item => {
      self.$set(self.dateOptions, item, configDatas[item]);
    });
    //获取当前最新时间信息
    self.calendarOptions.value = self.getNewDate();
    console.log('当前日期', self.calendarOptions.value);
    //调用初始化
    if (Object.keys(self.dateOption).length) {
      self.initDate(self.dateOption);
    }
    console.log('传递的参数信息', self.dateOption);
  },
  watch: {
    /***
     * 监听传入的参数对象信息
     * * */
    dateOption(newVal, oldVal) {
      const self = this;
      //调用初始化
      if (Object.keys(newVal).length) {
        self.initDate(newVal);
      }
      console.log('修改参数对象信息', newVal);
    }
  }
};
</script>

<style>
.calendar_flex {
  box-sizing: border-box;

  display: -webkit-box;
  -webkit-box-pack: start;
  -webkit-box-align: start;

  display: -webkit-flex;
  -webkit-justify-content: space-between;
  -webkit-align-items: top;

  display: flex;
  justify-content: space-between;
  align-items: top;
  flex-flow: row wrap;
}
.calendar_flex > div {
  margin: 10px;
  padding: 20px;
  width: 25%;
  min-width: 300px;
  border: 1px solid #eee;
  border-radius: 2px;
  position: relative;
}
.calendar_flex > div > span {
  position: absolute;
  left: 0px;
  top: 0px;
  padding: 5px 10px;
  font-family: 'PingFang SC', 'Hiragino Sans GB', 'STHeiti', 'Microsoft YaHei',
    'WenQuanYi Micro Hei', sans-serif;
  font-size: 10px;
  border-radius: 0 0 2px 0;
  background: #ea6151;
  color: #fff;
}
.calendar_flex > div > input {
  box-sizing: border-box;
  width: 100%;
  margin-top: 20px;
  border-radius: 2px;
  border: 1px solid #dedede;
  padding: 10px;
  font-size: 16px;
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWwpAZm9udC1mYWNlIHsgZm9udC1mYW1pbHk6IGlmb250OyBzcmM6IHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuZW90PyNpZWZpeCIpIGZvcm1hdCgiZW1iZWRkZWQtb3BlbnR5cGUiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS53b2ZmIikgZm9ybWF0KCJ3b2ZmIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUudHRmIikgZm9ybWF0KCJ0cnVldHlwZSIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LnN2ZyNpZm9udCIpIGZvcm1hdCgic3ZnIik7IH0KCl1dPjwvc3R5bGU+PC9kZWZzPjxnIGNsYXNzPSJ0cmFuc2Zvcm0tZ3JvdXAiPjxnIHRyYW5zZm9ybT0ic2NhbGUoMC4wMTU2MjUsIDAuMDE1NjI1KSI+PHBhdGggZD0iTTcxMS4zMDYyIDI5MC42OTcyYzI0LjI4MjEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTU0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMjYgMC00My45ODggMTkuNzI4NC00My45ODggNDQuMDUzNXYyMDAuMTA0OTZDNjY3LjMxODMgMjcwLjk5MDMgNjg3LjAwMzYgMjkwLjY5NzIgNzExLjMwNjIgMjkwLjY5NzJ6TTYyMy40ODA4IDExMy40MjAzSDQwMC43NjQ5Mjh2NjYuNTEzOTJoMjIyLjcxNTkwNDAwMDAwMDAyVjExMy40MjAyODh6TTg4NC4wNTMgMTEzLjQyMDNoLTgyLjc3NDAxNnY2Ni4xNDUyOGg4NS45NDAyMjRjMjUuMjc4NSAwIDQ2LjYxMTUgMjEuMzc2IDQ2LjYxMTUgNDYuNjc3djE1My45Mjc2OEg5MC40Mzg2NTYwMDAwMDAwMXYtMTUzLjkyNzY4YzAtMjUuMyAyMS4zMzMtNDYuNjc3IDQ2LjYxMTUtNDYuNjc3aDg2LjUwMzQyNFYxMTMuNDIwMjg4aC04Mi42NDI5NDRjLTY0LjA4NiAwLTExNi41MDc2IDUyLjUwODctMTE2LjUwNzYgMTE2LjcwMzJ2Njc2LjgwMTUzNTk5OTk5OTljMCA2NC4xNzQxIDUwLjQ5MTQgMTE2LjY4MDcgMTE0LjU3NzQgMTE2LjY4MDdIODg0LjA1Mjk5MmM2NC4wNjI1IDAgMTE2LjUwNjYtNTIuNTA2NiAxMTYuNTA2Ni0xMTYuNjgwN1YyMzAuMTIzNTE5OTk5OTk5OThDMTAwMC41NTk2IDE2NS45MjkgOTQ4LjExNDQgMTEzLjQyMDMgODg0LjA1MyAxMTMuNDIwM3pNOTMzLjgyOTYgOTEwLjM1MTRjMCAyNS4zLTIxLjMzMyA0Ni42NzYtNDYuNjExNSA0Ni42NzZIMTM3LjA1MDExMTk5OTk5OTk4Yy0yNS4yNzg1IDAtNDYuNjExNS0yMS4zNzYtNDYuNjExNS00Ni42NzZWNDQ2LjQ0NTU2OEg5MzMuODI5NjMyVjkxMC4zNTEzNnpNMjY3LjEwODQgNjQ2LjE4MTljMzYuODc3MyAwIDY2Ljc1MjUtMjkuOTM5NyA2Ni43NTI1LTY2Ljg4MTUgMC0zNi45MjI0LTI5Ljg3NTItNjYuODYxMS02Ni43NTI1LTY2Ljg2MTEtMzYuODU0OCAwLTY2Ljc1MjUgMjkuOTM5Ny02Ni43NTI1IDY2Ljg2MTFDMjAwLjM1NTggNjE2LjI0MjIgMjMwLjI1MjUgNjQ2LjE4MTkgMjY3LjEwODQgNjQ2LjE4MTl6TTUxMS41NDg0IDY0Ni4xODE5YzM2Ljg1NTggMCA2Ni43NTI1LTI5LjkzOTcgNjYuNzUyNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTU3LTY2Ljg2MTEtNjYuNzUyNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzQ0NC43OTU5IDYxNi4yNDIyIDQ3NC42NzExIDY0Ni4xODE5IDUxMS41NDg0IDY0Ni4xODE5ek0yNjUuOTE2NCA4OTAuNzA5YzM2Ljg3NzMgMCA2Ni43NTE1LTI5LjkzOTcgNjYuNzUxNS02Ni44NjExIDAtMzYuOTQyOC0yOS44NzQyLTY2Ljg4MjYtNjYuNzUxNS02Ni44ODI2LTM2Ljg1NTggMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44ODI2QzE5OS4xNjM5IDg2MC43NjkzIDIyOS4wNTk2IDg5MC43MDkgMjY1LjkxNjQgODkwLjcwOXpNNTExLjU0ODQgODkwLjcwOWMzNi44NTU4IDAgNjYuNzUyNS0yOS45Mzk3IDY2Ljc1MjUtNjYuODYxMSAwLTM2Ljk0MjgtMjkuODk1Ny02Ni44ODI2LTY2Ljc1MjUtNjYuODgyNi0zNi44NzczIDAtNjYuNzUyNSAyOS45Mzk3LTY2Ljc1MjUgNjYuODgyNkM0NDQuNzk1OSA4NjAuNzY5MyA0NzQuNjcxMSA4OTAuNzA5IDUxMS41NDg0IDg5MC43MDl6TTc1NS42NDEzIDY0Ni4xODE5YzM2Ljg1NjggMCA2Ni43NTM1LTI5LjkzOTcgNjYuNzUzNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTY3LTY2Ljg2MTEtNjYuNzUzNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzY4OC44ODk5IDYxNi4yNDIyIDcxOC43NjQgNjQ2LjE4MTkgNzU1LjY0MTMgNjQ2LjE4MTl6TTMxMS43MDM2IDI5MC42OTcyYzI0LjI4MTEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTQ0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMTYgMC00My45ODkgMTkuNzI4NC00My45ODkgNDQuMDUzNXYyMDAuMTA0OTZDMjY3LjcxNDYgMjcwLjk5MDMgMjg3LjQwMiAyOTAuNjk3MiAzMTEuNzAzNiAyOTAuNjk3MnoiIGZpbGw9IiM1ZTdhODgiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==)
    no-repeat 8px 10px;
  padding-left: 36px;
  color: #666;
}

/*transition*/
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateY(-10px);
}

/*下拉框*/
.calendar-dropdown {
  background: #fff;
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 2px;
}
.calendar-dropdown:before {
  position: absolute;
  left: 30px;
  top: -10px;
  content: '';
  border: 5px solid rgba(0, 0, 0, 0);
  border-bottom-color: #dedede;
}
.calendar-dropdown:after {
  position: absolute;
  left: 30px;
  top: -9px;
  content: '';
  border: 5px solid rgba(0, 0, 0, 0);
  border-bottom-color: #fff;
}

/*弹出框*/
.calendar-dialog {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.calendar-dialog-mask {
  background: rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 100%;
}

.calendar-dialog-body {
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 2px;
}

.calender_icon {
  display: inline-block;
  width: 14px;
  height: 14px;
  background: #ddd;
  margin-right: 3px;
}
</style>
