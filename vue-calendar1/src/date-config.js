//日历类型
const dateType = {
  zh: {
    weeks: [
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六'
    ],
    months: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
    ]
  },
  en: {
    weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
  }
}

// 日历icon图标信息
const dateIcon = {
  '1': `<span class="calender_icon calender_deal_icon">1</span>`,
  '2': `<span class="calender_icon calender_push_icon">2</span>`,
  '3': `<span class="calender_icon calender_push_icon">3</span>`
}

export default {
  dateType,
  dateIcon
}
