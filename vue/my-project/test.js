cosnt option = {
  // 顶部标题
  title: {
    value: '中指地主基于经济水平、人口潜力、市场表现等指标体系,对所选的40个城市进行对比分析，提供策略建议如下：',
    color: 'black'
  },
  color: [
    '#1176b7',
    '#2596d0',
    '#f96226',
    '#fd8421',
    '#fbb733',
    '#ffdb43'
  ],
  // 数据源存放
  series: {
    // 左上
    leftTop: {
      // 标题
      title: {
        value: '第一梯队',
        color: 'red'
      },
      // 文本
      text: {
        value: '多为区域中心城市或经济发达、人口规模大的地级市，经济水平居住居城市群前列，且保持中高速增长，自身禅意基础好，产业机构不断提升，居民购买力较强，交通便捷度高 ，多数城市高铁网络发达，获奖收到高铁开通利好。房价地价水平仍然有上升空间，市场容量大，土地供应规模较大，市场潜力突出，建议重点进入。',
        color: 'black'
      },
      // 是否换行
      isNewline: true,
      // 线框颜色
      rectColor: 'red'
    },
    // 左下
    leftBot: {
      // 标题
      title: {
        value: '第三梯队',
        color: 'red'
      },
      // 文本
      text: {
        value: '经济、人口、产业等部分要素存在一定的短板，交通通达性一般，部分城市高铁从无到有，规划利好成都较高，城市市场规模中等，市场政策相对宽松，可做关注。',
        color: 'black'
      },
      // 是否换行
      isNewline: false,
      rectColor: 'red'
    },
    // 右上
    rightTop: {
      // 标题
      title: {
        value: '第二梯队',
        color: 'red'
      },
      // 文本
      text: {
        value: '区域中心城市，经济发达，交通通达性高，产业发达，就业机会多，人口吸引力强，需求旺盛。房地产市场法阵成熟，地价。房价水平均居城市群前列，总价门槛高，土地市场竞争激烈，利润空间受到亚索，建议择机进入。',
        color: 'black'
      },
      // 是否换行
      isNewline: true,
      rectColor: 'black'
    },
    // 右下
    rightBot: {
      // 标题
      title: {
        value: '第四梯队',
        color: 'red'
      },
      // 文本
      text: {
        value: '经济水平较差，产业基础薄弱，产业结构任然以第二产业为主，对外交通通达性弱，未来高铁规划线路少，人口基数小，且为人口流出型城市，居民购买力弱，对房地产市场制支撑能力弱，目前市场规模小，土地供应有限。',
        color: 'black'
      },
      // 是否换行
      isNewline: false,
      rectColor: 'black'
    },
    // 中部内容
    center: {
      // 顶部标题
      topTitle: {
        backgroundColor: '#99CCFF', //背景色
        color: 'black', // 字体颜色
        value: '市场空间'
      },
      // 左侧标题
      leftTitle: {
        backgroundColor: '#99CCFF', //背景色
        color: 'black', // 字体颜色
        value: '投资价值'
      },
      // 中心内容区
      centerData: [{
          backgroundColor: '#fff', //背景色
          isBetweenLoR: true, //是否区分左右
          // 左侧的文案
          leftText: {
            value: '高',
            color: 'black' //字体颜色
          },
          left: {
            backgroundColor: 'red', //背景色
            value: ['南京，宁波，合肥，无锡', '南通，常州'],
            // 顶部 标题
            topTitle: {
              value: '高',
              color: 'black'
            },
            color: '#fff' //字体颜色
          },
          right: {
            backgroundColor: 'black', //背景色
            value: ['杭州'],
            // 顶部 标题
            topTitle: {
              value: '低',
              color: 'black'
            },
            color: '#fff' //字体颜色
          }
        },
        {
          backgroundColor: '#FFCC99', //背景色
          isBetweenLoR: false, //是否区分左右
          // 左侧的文案
          leftText: {
            value: '中',
            color: 'black' //字体颜色
          },
          value: [
            '台州、绍兴、金华、盐城',
            '湖州、扬州、镇江、芜湖',
            '台州、舟山、马鞍山、赣州'
          ],
          color: '#fff'
        },
        {
          backgroundColor: '#CCCCCC', //背景色
          isBetweenLoR: false, //是否区分左右
          // 左侧的文案
          leftText: {
            value: '低',
            color: 'black' //字体颜色
          },
          value: ['宜城、安庆、铜陵、池州'],
          color: '#fff'
        }
      ]
    }
  }
},
