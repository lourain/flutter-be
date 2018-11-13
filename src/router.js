import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ArticlePage from './views/ArticlePage.vue'
import PicPage from './views/PicPage.vue'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
	{
		path:'/',
		name:'login',
		component:Login
	},
    {
      path: '/home',
	  name: 'home',
	  meta:{
		require_auth:true
	  },
      component: Home,
      children:[
        {
            path:'article',
			name:'article',
			component:ArticlePage
			
        },
        {
            path:'pic',
			name:'pic',
			component:PicPage
        },
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

router.beforeEach((to,from,next)=>{
	if(to.matched.some(item=>item.meta.require_auth)){
		//查看是否有token，否则就登录
		localStorage.flutter_token?next():next({path:'/',query:{redirect:to.fullPath}})
	}else{
		next()
	}
})



export default router