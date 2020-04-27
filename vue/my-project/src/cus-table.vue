<template>
  <div>
    <div>
      普通表格
      <normal-table></normal-table>
    </div>
    <div>
      跨行表格
      <spancol-table></spancol-table>
    </div>
    <div>
      给行上颜色的表格
      <color-table></color-table>
    </div>
  </div>
</template>

<script>
import NormalTable from './components/test-table/normal-table';
import SpancolTable from './components/test-table/spancol-table';
import ColorTable from './components/test-table/color-table';

export default {
  components: { NormalTable, SpancolTable, ColorTable },
  data() {
    //这里存放数据
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>