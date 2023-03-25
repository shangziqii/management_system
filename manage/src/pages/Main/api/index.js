import axios from "axios";
// 个人信息获取
export const getInfo = (params) => {
    return axios.get('api/user/inform/get', {
        headers: { 'token': params }
    })
}
export const changePass = (params) => {
    return axios.post('/api/user/update_password', params)
}

// 新增用户(注册)
export const addUser = (data) => {
    return axios.post('/api/uer/register', {
        headers: { 'token': localStorage.getItem('token') }
    })
}

// 展示用户列表
export const getList = (params) => {
    return axios.get('/api/user/list', {
        headers: { 'token': localStorage.getItem('token') },
        params: {
            page: 1,
            pageLimit: 20
        }
    })
}

// 删除用户信息
export const delUser = (data) => {
    return axios.post('/api/user/delete', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }

    })
}