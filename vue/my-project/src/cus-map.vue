<template>
  <div style="width:100%;height:800px">
    <div
      id="container"
      style="width:100%;height:100%"
    ></div>
  </div>
</template>

<script>
const objFunc = require('yjy-map-icon');
import 'yjy-map-icon/css/pc.css';

export default {
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var position = new AMap.LngLat(116.397428, 39.90923);

      // 创建地图实例
      var map = new AMap.Map('container', {
        zoom: 13,
        center: position,
        resizeEnable: true
      });

      // 点标记显示内容，HTML要素字符串
      var markerContent = `<div class="map_mark map_mark_company map_company_color1">
        <a class="map_icon"></a>
        <div class="map_tips">
          <span>轨道交通</span>
        </div>
      </div>`;

      // 例如
      const eg = objFunc.getIconDetail({
        type: 'pc',
        iconName: '页面通用图标'
      });

      const { iconClass, iconUrl } = eg;

      console.log(eg);

      var marker = new AMap.Marker({
        position: position,
        // 将 html 传给 content
        content: markerContent,
        // icon: iconUrl,
        // 以 icon 的 [center bottom] 为原点
        offset: new AMap.Pixel(-13, -30)
      });

      // 将 markers 添加到地图
      map.add(marker);

      map.setFitView();
    }
  }
};
</script>