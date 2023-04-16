import axios from 'axios'
//拉取列表
export const scholarshipList = (params) => {
    return axios.get('/api/scholarship/list', {
        headers: { 'token': localStorage.getItem('token') },
        params
    })
}
//添加信息
export const addInfo = (data) => {
    return axios.post('/api/scholarship/add', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
//删除记录
export const removeInfo = (data) => {
    return axios.post('/api/scholarship/delete', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
//修改信息
export const changeInfo = (data) => {
    return axios.post('/api/scholarship/modify', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}

/* //使用学生学号进行搜索
export const searchUseNum = (params) => {
    return axios.get('/api/prizeStudent/list', {
        headers: { 'token': localStorage.getItem('token') },
        params
    })
} */

//添加信息页面上传学生信息
export const uploadFiles = (params) => {
    return axios.post('/api//scholarship/uploadFile', params, {
        headers: {
            'token': localStorage.getItem('token')
        }
    })
}