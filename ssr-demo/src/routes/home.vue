<!-- home.vue -->
<template>
    <div>
        home
        <div>{{ homeInfo }}</div>
    </div>
</template>


<script>
export default {
  //疑问5 此处请求数据的方法 再 entry-server 文件发起请求 那么其他请求是否也是这样、
  serverRequest(store) {
    return store.dispatch('getHomeInfo');
  },
  mounted() {},
  computed: {
    homeInfo() {
      return this.$store.state.homeInfo;
    }
  }
};
</script>


<style scoped>
</style>