import axios from "axios";
//获取助学金记录列表
export const subsList = (params) => {
    return axios.get('/api/studentSubsidies/list', {
        headers: { 'token': localStorage.getItem('token') },
        params
    })
}

//添加助学金信息
export const addSub = (data) => {
    return axios.post('/api/studentSubsidies/add', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}

//删除助学金信息
export const delSub = (data) => {
    return axios.post('/api/studentSubsidies/delete', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
// 修改助学金信息
export const editSub = (data) => {
    return axios.post('/api/studentSubsidies/modify', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
// 文件上传接口
export const uploadFiles = (params) => {
    return axios.post('/api/studentSubsidies/uploadFile', params, {
        headers: {
            'token': localStorage.getItem('token')
        }
    })
}
