import {
    createApp
} from '../src/main';

const app = createApp();

// 同步服务端信息
if (window.__INITIAL_STATE__) {
    //替换store的跟状态
    app.$store.replaceState(window.__INITIAL_STATE__)
}

//绑定app根元素
window.onload = () => app.$mount('#app')