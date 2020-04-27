<template>
  <div style="height:850px;">
    <yjy-form-edit
      style="height:100%;"
      :data="null"
      :remote-info="remoteFuncs"
    ></yjy-form-edit>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    //这里存放数据
    return {
      // 远程的方法集合
      remoteFuncs: {
        func_test(resolve) {
          setTimeout(() => {
            console.log('开始拉取数据信息');

            resolve(null);
          }, 2000);
        }
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>