import Vue from 'vue'
import VueRouter from 'vue-router';
import {BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import App from './App.vue'
import Home from './components/Home.vue';

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

const routes = [
	{path: "/",component: Home},
];

const router = new VueRouter({routes: routes, mode: "history"});

new Vue({
	el: '#app',
	router: router,
	render: h => h(App)
});