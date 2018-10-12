import Vue from 'vue';
import createRouter from './route';
import App from './App.vue';
import createStore from './store'

//创建一个工厂函数 创建vue实例
export function createApp() {
    const router = createRouter();
    const store = createStore();
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })
    return app;
}