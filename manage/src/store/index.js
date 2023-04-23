import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import detail from './detail'
import showNav from './showNav'
// import menu from './menu'

Vue.use(Vuex)

// 创建vuex的实例
export default new Vuex.Store({
    modules: {
        detail,
        showNav,
        // menu
    },
    plugins: [
        createPersistedState({
            key: 'my-app',
            // storage: window.localStorage
            storage: window.sessionStorage
        })
    ]
})