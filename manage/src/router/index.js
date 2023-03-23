import {
    createRouter,
    createWebHashHistory,
} from 'vue-router'

import Home from '@/pages/Home'
import Info from '@/pages/Info'
import AccInfo from '@/pages/Info/AccInfo'
import PerInfo from '@/pages/Info/PerInfo'
import ClassMgt from '@/pages/Info/ClassMgt'
import StuMgt from '@/pages/Info/StuMgt'
import OutInfos from '@/pages/Info/StuMgt/OutInfos'
import WinInfos from '@/pages/Info/StuMgt/WinInfos'
import PoorInfos from '@/pages/Info/StuMgt/PoorInfos'
import StuInfos from '@/pages/Info/StuMgt/StuInfos'
import Scholarship from '@/pages/Info/Scholarship'
import StuSubsidies from '@/pages/Info/StuSubsidies'
import Login from '@/pages/Home/Login'
import Register from '@/pages/Home/Register'

const routes = [
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: 'login',
                component: Login
            },
            {
                path: 'register',
                component: Register
            }
        ]
    },
    {
        path: '/info',
        component: Info,
        children: [
            {
                path: 'perInfo',
                component: PerInfo
            },
            {
                path: 'accInfo',
                component: AccInfo
            },
            {
                path: 'classMgt',
                component: ClassMgt
            },
            {
                path: 'stuMgt',
                component: StuMgt,
                children: [
                    {
                        path: 'stuInfos',
                        component: StuInfos
                    },
                    {
                        path: 'poorInfos',
                        component: PoorInfos
                    },
                    {
                        path: 'WinInfos',
                        component: WinInfos
                    },
                    {
                        path: 'outInfos',
                        component: OutInfos
                    }
                ]
            },
            {
                path: 'scholarship',
                component: Scholarship
            },
            {
                path: 'stuSubsidies',
                component: StuSubsidies
            }
        ]
    },
    //重定向，项目进行运行时，访问/，立马定向到home页面
    {
        path: '/:catchAll(.*)',
        redirect: '/home/login'
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router;