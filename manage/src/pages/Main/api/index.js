import axios from 'axios'

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