import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 引入页面组件

// 登录页面
import Login from '../pages/Login';

//引入Main 页面 --- 其他页面都是Main页面下的二级路由
import Main from '../pages/Main'

import Pim from '@/pages/Pim'
import Am from '@/pages/Am'
import Cim from '@/pages/Cim'
import Sim from '@/pages/Sim'
import Gar from '@/pages/Gar'
import Ser from '@/pages/Ser'
import Details from '@/pages/Details'
import ClassLesson from '@/pages/ClassLesson'
import ClassMeet from '@/pages/ClassMeet'
import ClassTalk from '@/pages/ClassTalk'
import Domitory from '@/pages/Domitory'

//引入Sim（学生信息管理下的路由）
import Bsi from '@/pages/Sim/Bsi'
import Dsi from '@/pages/Sim/Dsi'
import Sa from '@/pages/Sim/Sa'
import Svrad from '@/pages/Sim/Svrad'
import Pm from '@/pages/Sim/Pm'

//引入Bsi（基本学生信息管理的详情页）
import InfoDetails from '@/pages/Sim/Bsi/InfoDetails'

// 创建routes,创建路由
const routes = [
    {
        path: '/Login',
        component: Login,
    },
    {
        path: '/Main',
        component: Main,
        redirect: '/Main/Pim',
        children: [
            {
                path: 'Am',
                component: Am
            },
            {
                path: 'Cim',
                component: Cim,
                children: [
                    {
                        path: 'Details',
                        component: Details,
                        children: [
                            {
                                path: 'ClassLesson',
                                component: ClassLesson
                            },
                            {
                                path: 'ClassMeet',
                                component: ClassMeet
                            },
                            {
                                path: 'ClassTalk',
                                component: ClassTalk
                            },
                            {
                                path: 'Domitory',
                                component: Domitory
                            }
                        ]

                    }
                ]
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
                        component: Bsi,
                        children: [
                            {
                                path: 'InfoDetails',
                                component: InfoDetails
                            }
                        ]
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
                    },
                    {
                        path: 'Pm',
                        component: Pm
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

// 全局前置路由守卫---初始化和每次路由切换之前调用
router.beforeEach((to, from, next) => {
    if (to.path === '/Main') {
        if (localStorage.getItem('token')) {
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

