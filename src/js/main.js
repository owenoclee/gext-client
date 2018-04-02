import 'es6-promise/auto';
import 'google-protobuf';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/app.vue';
import Thread from './components/thread.vue';

Vue.component('navigation', require('./components/navigation.vue'));
Vue.component('post', require('./components/post.vue'));
Vue.component('start-thread', require('./components/start-thread.vue'));
Vue.component('thread', Thread);

Vue.use(VueRouter);

new Vue({
    router: new VueRouter({
        routes: [
            { path: '/:board/:page', component: require('./components/board.vue'), props: true },
            { path: '/:board/thread/:thread', component: Thread, props: true },
            { path: '/', redirect: '/general' },
            { path: '/:board/1', alias: '/:board' },
        ],
    }),
    render: createEle => createEle(App),
}).$mount('#app');
