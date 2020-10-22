import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import Home from './components/Home.vue';
import Login from './components/Login.vue';

Vue.use(VueRouter);

const routes = [
	{path: "/",component: Home},
	{path: "/login", component: Login}
];

const router = new VueRouter({routes: routes, mode: "history"});

new Vue({
	el: '#app',
	router: router,
	render: h => h(App)
});