<template>
  <div>
    测试信息
    <button @click="addAttr()">添加属性</button>
    <button @click="changeAttr()">改变属性</button>
    <button @click="saveAttr()">修改vuex</button>
    <button @click="addVuexAttr()">创建vuex属性</button>
    <button @click="testAttr()">测试属性</button>
    <hr>
    手机端自动拉起
    <input
      class="focus-element"
      type="text"
      value="1111"
    >
    <button class="get-focus">获得焦点并弹出虚拟键盘</button>
    <hr>
    自定义 季度
    <br>
    <date-picker
      v-model="value3"
      type="quarter"
      placeholder="选择季度"
    >
    </date-picker>
    <br>
    <br>
    element-UI 时间控件
    <el-date-picker
      v-model="value4"
      type="month"
      placeholder="选择月"
    >
    </el-date-picker>
  </div>
</template>

<script>
import Vue from 'vue';
// import datePicker from './components/custom-date/data-picker';

export default {
  name: 'test-vuex',
  components: {
    // datePicker
  },
  data() {
    return {
      text: '',
      objs: {},
      value3: '2019.04.30-2019.06.30',
      value4: ''
    };
  },
  mounted() {
    const self = this;
    (function($) {
      $('.focus-element').focus();
      // console.log('自动触发 获取焦点');
      $('.get-focus').addEventListener('click', function() {
        $('.focus-element').focus();
      });
    })(document.querySelector.bind(document));

    setTimeout(() => {
      self.value3 = '2015.07.31-2015.09.30';
    }, 3000);
  },
  computed: {
    getVuex() {
      return this.$store.state.count;
    },
    getVuexs() {
      return this.$store.state.sss;
    }
  },
  watch: {
    theText(newVal, oldVal) {
      console.log('监听新属性', newVal);
    },
    text(newVal, oldVal) {
      console.log('监听新属性', newVal);
    },
    getVuex(val) {
      console.log('监听vuex', val);
    },
    getVuexs(val) {
      console.log('监听vuexsss', val);
    },
    counts(val) {
      console.log(1111, val);
    },
    objs(newVal) {
      console.log('添加新属性信息', newVal);
    }
  },
  methods: {
    /****
     * 添加属性
     */
    addAttr() {
      const self = this;
      self.theText = '添加信息';
      self.text = '111111111';
    },
    /***
     * 改变属性
     * * */
    changeAttr() {
      const self = this;
      self.theText = '改变属性';
    },
    saveAttr() {
      const self = this;

      self.$store.commit('increment', { type: 'count', data: 10 });
      self.$store.commit('addVount', { type: 'sss', data: 123 });
    },
    addVuexAttr() {
      const self = this;
      self.$store.commit('addVount', { type: 'sss', data: 666 });
    },
    testAttr() {
      const self = this;
      self.$set(this.objs, 'counts', 121);
      setTimeout(() => {
        self.$set(this.objs, 'aaa', 111);
        self.$set(this.objs, 'counts', 12345);
      }, 2000);
      //   self.$set(self, );
    }
  }
};
</script>

<style>
</style>
