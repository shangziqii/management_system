import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 引入页面组件

// 登录页面
import Login from '../pages/Login';

//引入Main 页面 --- 其他页面都是Main页面下的二级路由
import Main from '../pages/Main'

//引入Main 页面下的所有二级路由
import Pim from '@/pages/Main/Pim'
import Am from '@/pages/Main/Am'
import Cim from '@/pages/Main/Cim'
import Sim from '@/pages/Main/Sim'
import Gar from '@/pages/Main/Gar'
import Ser from '@/pages/Main/Ser'

//引入Sim（学生信息管理下的路由）
import Bsi from '@/pages/Main/Sim/Bsi'
import Dsi from '@/pages/Main/Sim/Dsi'
import Sa from '@/pages/Main/Sim/Sa'
import Svrad from '@/pages/Main/Sim/Svrad'


// 创建routes,创建路由
const routes = [
    {
        path: '/Login',
        component: Login,
    },
    {
        path: '/Main',
        component: Main,
        meta: { isAuth: true },
        children: [
            {
                path: 'Am',
                component: Am
            },
            {
                path: 'Cim',
                component: Cim,
            },
            {
                path: 'Gar',
                component: Gar
            },
            {
                path: 'Pim',
                component: Pim
            },
            {
                path: 'Ser',
                component: Ser
            },
            {
                path: 'Sim',
                component: Sim,
                children: [
                    {
                        path: 'Bsi',
                        component: Bsi
                    },
                    {
                        path: 'Dsi',
                        component: Dsi
                    },
                    {
                        path: 'Sa',
                        component: Sa
                    },
                    {
                        path: 'Svrad',
                        component: Svrad
                    }

                ]
            }
        ]
    },

    //路由重定向
    {
        path: '*',
        redirect: '/Login'
    }
];


// 实例化路由
const router = new VueRouter({
    routes
});

export default router

