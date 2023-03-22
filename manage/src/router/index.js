import {
    createRouter,
    createWebHashHistory,
} from 'vue-router'

import Home from '@/pages/Home'
import Administrator from '@/pages/Administrator'
import Teacher from '@/pages/Teacher'
import Counselor from '@/pages/Counselor'
import AccInfo from '@/pages/Counselor/AccInfo'
import PerInfo from '@/pages/Counselor/PerInfo'
import ClassMgt from '@/pages/Counselor/ClassMgt'
import StuMgt from '@/pages/Counselor/StuMgt'
import OutInfos from '@/pages/Counselor/StuMgt/OutInfos'
import WinInfos from '@/pages/Counselor/StuMgt/WinInfos'
import PoorInfos from '@/pages/Counselor/StuMgt/PoorInfos'
import StuInfos from '@/pages/Counselor/StuMgt/StuInfos'
import Scholarship from '@/pages/Counselor/Scholarship'
import StuSubsidies from '@/pages/Counselor/StuSubsidies'

const routes = [
    {
        path: '/home',
        component: Home
    },
    {
        path: '/administrator',
        component: Administrator,
        meta: { show: false }
    },
    {
        path: '/teacher',
        component: Teacher
    },
    {
        path: '/counselor',
        component: Counselor,
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
        redirect: '/home'
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router;