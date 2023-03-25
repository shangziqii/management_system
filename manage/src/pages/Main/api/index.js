import axios from "axios";
// 个人信息获取
export const getInfo = (params) => {
    return axios.get('api/user/inform/get', {
        headers: { 'token': params }
    })
}
//修改用户密码（失败，参数错误）
export const changePass = (params) => {
    return axios.post('/api/user/update_password', params, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}

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

//获取班级列表(显示服务器异常)
export const classList = (params) => {
    return axios.get('/api/class/list', {
        headers: { 'token': localStorage.getItem('token') },
        params: {
            page: 1,
            pageLimit: 20
        }
    })
}

//添加班级信息(管理员显示权限不足？)
export const addClass = (data) => {
    return axios.post('/api/class/register', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}