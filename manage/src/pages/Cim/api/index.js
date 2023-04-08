import axios from "axios";
//获取班级列表
export const classList = (params) => {
    return axios.get('/api/class/list', {
        headers: { 'token': localStorage.getItem('token') },
        params: {
            page: 1,
            pageLimit: 20
        }
    })
}

//添加班级信息(事先判断是否是辅导员身份)
export const addClass = (data) => {
    return axios.post('/api/class/register', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}

//删除某条班级信息
export const delClass = (data) => {
    return axios.post('/api/class/delete', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
// 查询班级信息
export const searchClass = (params) => {
    return axios.get('/api/class/get', {
        headers: { 'token': localStorage.getItem('token') },
        params
    })
}
// 修改班级信息
export const editClass = (data) => {
    return axios.post('/api/class/modify', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
// 获取辅导员列表
export const simpleList = (params) => {
    return axios.get('/api/user/simpleList1', {
        headers: { 'token': localStorage.getItem('token') },
        params
    })
}
