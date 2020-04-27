const obj = {
  "legend": {
    "data": ["万科", "保利", "中海"]
  },
  "xAxis": {
    "data": [
      "2018年第一季度",
      "2018年第二季度",
      "2018年第三季度",
      "2018年第四季度"
    ]
  },
  "color": ["#fdsfg4", "#fdsfg4", "#fdsfg4", "#fdsfg4", "#fdsfg4"],
  "series": [{
    "name": "万科",
    "markLine": {
      "show": true
    },
    "data": [{
      "value": 251,
      "description": "激进"
    }, {
      "value": 269
    }, {
      "value": 300
    }, {
      "value": 300
    }],
    "label": {
      "formatter": (val) => {
        return val
      }
    }
  }, {
    "name": "保利",
    "data": [{
      "value": 251,
      "description": "激进"
    }, {
      "value": 269
    }, {
      "value": 300
    }, {
      "value": 300
    }]
  }, {
    "name": "中海",
    "data": [{
      "value": 251,
      "description": "激进"
    }, {
      "value": 269
    }, {
      "value": 300
    }, {
      "value": 300
    }]
  }]
}
