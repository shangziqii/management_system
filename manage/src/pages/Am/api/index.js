import axios from "axios";
//新增用户
export const addUser = (data) => {
    return axios.post('/api/user/register', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}

// 展示用户列表
export const getList = (params) => {
    return axios.get('/api/user/list', {
        headers: { 'token': localStorage.getItem('token') },
        params
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

// 查询用户个人信息
// export const getUser = (params) => {
//     return axios.get('/api/user/inform/get', {
//         headers: { 'token': localStorage.getItem('token') },
//     })
// }