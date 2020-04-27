/***
 * 季度 配置信息表
 * * */
const QUARTER_CONFIG = {
  第一季度: {
    containMonth: '1,2,3', //当前季度 所包含的月份
    dateMin: '01.01', //最小时间
    dateMax: '03.31' //最大时间
  },
  第二季度: {
    containMonth: '4,5,6',
    dateMin: '04.30', //最小时间
    dateMax: '06.30' //最大时间
  },
  第三季度: {
    containMonth: '7,8,9',
    dateMin: '07.31', //最小时间
    dateMax: '09.30' //最大时间
  },
  第四季度: {
    containMonth: '10,11,12',
    dateMin: '10.31', //最小时间
    dateMax: '12.31' //最大时间
  }
};

/**
 * 默认值 拆解 将 传入的时间范围 转化为 季度
 * 2018.01.01-2018.03.31
 * * */
const changeDefaultVal = (val) => {
  const defaultVal = val;
  let result = '';
  if (defaultVal) {
    //第一次拆分  将时间段拆分为 两个单独时间
    let splitStr = defaultVal.split('-');
    //第二次拆分 拆分出 年份 。 月 。 日
    let splitDateMin = (splitStr[0] || '').split('.');
    let splitDateMax = (splitStr[1] || '').split('.');
    const year =
      splitDateMin[0] === splitDateMax[0] ?
      splitDateMin[0] :
      splitDateMax[0];
    const dateMin = `${splitDateMin[1] || 0}.${splitDateMin[2]}`;
    const dataMax = `${splitDateMax[1] || 0}.${splitDateMax[2]}`;
    //季度
    let quarter = '';
    //从配置信息表中  查询对应的季度
    Object.keys(QUARTER_CONFIG).forEach(item => {
      const itemObj = QUARTER_CONFIG[item];
      if (itemObj.dateMin === dateMin && itemObj.dateMax === dataMax) {
        quarter = item;
      }
    });

    result = `${year}-${quarter}`;
  }

  return result || defaultVal;
}

export default {
  // 季度 配置信息表
  QUARTER_CONFIG,
  // 默认值 拆解 将 传入的时间范围 转化为 季度
  changeDefaultVal
}
