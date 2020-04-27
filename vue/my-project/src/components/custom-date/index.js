import DatePicker from './data-picker.js';

/* istanbul ignore next */
DatePicker.install = function install(Vue) {
  Vue.component(DatePicker.name, DatePicker);
};

export default DatePicker;
