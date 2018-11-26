import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Post from './views/Post.vue'
import PicPage from './views/PicPage.vue'
import OverView from './views/OverView.vue'
import Article from './views/Article.vue'


Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/',
			meta: {
				require_auth: true
			},
			component: Home,
			children: [
				{
					path:'',
					name:'OverView',
					component:OverView
				},
				{
					path: 'post',
					name: 'post',
					component: Post
				},
				{
					path: 'pic',
					name: 'pic',
					component: PicPage
				},
				{
					path:'article',
					name:'article',
					component:Article
				},
				{
					path:'edit',
					name:'edit',
					component:Post
				}
			]
		},
		
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
		}
	]
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(item => item.meta.require_auth)) {
		//查看是否有token，否则就登录
		localStorage.flutter_token ? next() : next({ path: '/login', query: { redirect: to.fullPath } })
	} else {
		next()
	}
})



export default router