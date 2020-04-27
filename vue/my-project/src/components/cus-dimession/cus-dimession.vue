<template>
  <div class="">
    teszst 12312312
  </div>
</template>

<script>
export default {
  name: "cus-dimession",
  components: {},
  data() {
    //这里存放数据
    return {
      // v-model 绑定值
      demissValue: {
        city: {
          group: "",
          value: []
        },
        district: {
          group: "",
          value: {}
        },
        board: {
          group: "",
          value: {}
        }
      }
    };
  },
  computed: {},
  watch: {
    demissValue(val) {
      console.log("v-model发生改变", val);
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
