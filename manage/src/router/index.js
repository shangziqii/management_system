import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";



const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

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
import Dormitory from '@/pages/Dormitory'

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
        // name: 'Pim',
        component: Main,
        redirect: '/Main/Pim',
        children: [
            {
                path: 'Am',
                name: 'Am',
                component: Am
            },
            {
                path: 'Cim',
                name: 'Cim',
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
                                path: 'Dormitory',
                                component: Dormitory
                            }
                        ]

                    }
                ]
            },
            {
                path: 'Gar',
                name: 'Gar',
                component: Gar
            },
            {
                path: 'Pim',
                name: 'Pim',
                component: Pim
            },
            {
                path: 'Ser',
                name: 'Ser',
                component: Ser
            },
            {
                path: 'Sim',
                name: 'Sim',
                component: Sim,
                children: [
                    {
                        path: 'Bsi',
                        name: 'Bsi',
                        component: Bsi,
                        children: [
                            {
                                path: 'InfoDetails',
                                name: 'InfoDetails',
                                component: InfoDetails
                            }
                        ]
                    },
                    {
                        path: 'Dsi',
                        name: 'Dsi',
                        component: Dsi
                    },
                    {
                        path: 'Sa',
                        name: 'Sa',
                        component: Sa
                    },
                    {
                        path: 'Svrad',
                        name: 'Svrad',
                        component: Svrad
                    },
                    {
                        path: 'Pm',
                        name: 'Pm',
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

// token 测试
const tokenTest = () => {
    return axios.get('/api/user/test', {
        headers: { 'token': localStorage.getItem('token') },
    })
}
// 添加一个变量来保存是否已经弹窗
let hasAlerted = false

// 全局前置路由守卫---初始化和每次路由切换之前调用
/* router.beforeEach((to, from, next) => {
    if (to.path !== '/Login') {
        tokenTest().then(res => {
            if (res.data.data.userId !== -1) {
                next()
            } else {
                // 如果已经弹窗，则不再重复弹窗
                if (!hasAlerted) {
                    alert('未登录，请先登录！')
                    hasAlerted = true
                }
                next({
                    path: '/Login'
                })
            }
        })
    } else {
        next()
    }
}) */
router.beforeEach((to, from, next) => {
    // 先放行，使路由开始跳转
    next()

    // 异步验证 token 并重定向
    if (to.path !== '/Login') {
        tokenTest().then(res => {
            if (res.data.data.userId !== -1) {
                // token 验证通过，不需要做任何操作
            } else {
                // 如果已经弹窗，则不再重复弹窗
                if (!hasAlerted) {
                    alert('未登录，请先登录！')
                    hasAlerted = true
                }
                location.href = '/Login'
            }
        })
    }
})


/* const protectedRoutes = ['/Main', '/Pim', '/Am', '/Cim', '/Sim', '/Gar', '/Ser', '/Details', '/ClassLesson', '/ClassMeet', '/ClassTalk', '/Dormitory', '/Bsi', '/Dsi', '/Sa', '/Svrad', '/Pm', '/InfoDetails'];

router.beforeEach((to, from, next) => {
    if (protectedRoutes.includes(to.path)) {
        if (localStorage.getItem('token')) {
            next();
        } else {
            // 在这里显示错误消息，而不是使用 alert
            next('/Login');
        }
    } else {
        next();
    }
}); */

export default router

