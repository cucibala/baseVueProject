import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './app.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import $ from "jquery";
import $cookie from "jquery.cookie";
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueAxios, axios);
const store=new Vuex.Store({
	state:{
		currentPromtMessage:"",
		promtMessageSign:true,
	},
	mutations:{
		//悬浮窗消息添加一条悬浮窗消息
		addPromtMessage(state,message){
			state.currentPromtMessage=message;
			state.promtMessageSign=!state.promtMessageSign;//通过更新信号值来提示有消息到来
		},
	}
});
//--------------路由配置-----------------
const Routers=[
{
	path:'/index',
	meta:{
		title:'首页'
	},
	component:(resolve)=>require(['./views/index.vue'],resolve)
},
{
	path:'/error',
	meta:{
		title:'错误'
	},
	component:(resolve)=>require(['./views/error.vue'],resolve)
},
{
	path:'*',
	redirect:'/error'
},
{
	path:'/',
	redirect:'/index'
}
];
const RouterConfig={
	base:__dirname,
	//mode:'history',//history模式会让页面变得更好看 但是只能在node的环境下运行
	routes:Routers
};
const router=new VueRouter(RouterConfig);
//路由跳转前要处理的事情
router.beforeEach((to,from,next)=>{
	document.title=to.meta.title;
	next();
});
//路由跳转后要处理的事情
router.afterEach((to,from,next)=>{
	//window.scrollTo(0,0);
});
//--------------------------------------

new Vue({
	el:'#app',
	router:router,
	store:store,
	render:h=>{
		return h(App)
	}
});