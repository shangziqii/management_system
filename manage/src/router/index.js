import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 引入页面组件

// 登录页面
import Login from '../pages/Login';

//引入Main 页面 --- 其他页面都是Main页面下的二级路由
import Main from '../pages/Main'

// 创建routes,创建路由
const routes = [
    {
        path: '/Login',
        component: Login,
    },
    {
        path: '/Main',
        component: Main
    }
];

// 实例化路由
const router = new VueRouter({
    routes
});

// 全局前置路由守卫---初始化和每次路由切换之前调用
router.beforeEach((to ,from, next) => {
    if(to.path === '/Main') {
        if(localStorage.getItem('token')) {
            next();
        } else {
            alert('未登录，请先登录！')
            next({
                path: '/Login'
            })
        }
    } else {
        next()
    }
})
export default router

