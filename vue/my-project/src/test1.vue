<template>
  <div>测试</div>
</template>

<script>
export default {
  mounted() {
    (function($) {
      $('.focus-element').focus();
    })(document.querySelector.bind(document));
  }
};
</script>

<style>
</style>
