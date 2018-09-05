// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import testScrol from './test-scrol'

//引入滚动条组件
import {
  HappyScroll
} from 'vue-happy-scroll'
//自定义组件名
Vue.component('happy-scroll', HappyScroll)
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'
// import citymap from 'citymap-ui'

import elementui from 'element-ui'
const data = require("./data/data");

//注册全局组建
Vue.use(elementui);
// Vue.use(citymap);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    // App,
    testScrol
  },
  jsonData: [{ //后台返回的数据
    a: 1,
    b: 2
  }, {
    a: 3,
    b: 4
  }],
  tableList: [], //绑定表单的数据
  data: {
    data: {
      dimension: 'board',
      value: [1, 23, 4]
    },
    data: {},
    districtId: {},
    boardId: {
      dimension: "board",
      data: ['33806', '34426', '34348']
    },
    streetId: {
      dimension: "street",
      data: ['11444', '12001', '11265']
    },
    arrs: ["board", 'street']

  },
  methods: {
    confirmB(flag) {
      console.log(flag)
      console.log(this.streetId)

    },
    cancelB(flag) {
      console.log(flag)
    },
    /***
     * 请求接口返回数据
     * data 返回的数据
     * * */
    json(data) {
      let self = this;
      self.$set(self, 'tableList', data)
    },
    /**
     * 新增
     * * */
    add() {
      let self = this;
      let dataList = [...self.tableList];
      let obj = {
        a: '',
        b: ''
      }
      dataList.push(obj)
      //更新视图
      self.$set(self, 'tableList', dataList)
      //修改的时候就不用了  修改的时候用的是双向绑定  当值变化之后  会自动更新 tableList 里的值
    },
    /**
     * 保存
     * * */
    save() {
      let jsonDataParams = this.dataList
    },
    /**
     * 删除
     * index :当前元素下标
     * * */
    delete(index) {
      let self = this;
      let dataList = [...self.tableList];
      //截取对应的数据对象
      dataList.splice(index, 1);
      //刷新视图
      self.$set(self, 'tableList', dataList)
    }

  },
  created() {
    let myData = data.data;
    let self = this;
    this.$nextTick(() => {
      self.$set(self, 'data', myData)
      console.log(myData)
    })

    setTimeout(() => {
      self.$set(self, 'streetId', {


        // dimension: "district",
        // data: ['124419', '124552', '124517']

        dimension: "board",
        data: ['33806', '34426', '34348']


        // dimension: "street",
        //   data: ['11444', '12001', '11265']


      })

      // self.$set(self, 'arrs', ["board"])

    }, 500);
  },
  mounted() {
    // console.log(citymap);
  },
  watch: {
    districtId(newVal, oldVal) {
      console.log(newVal)

    }
  }
})
