import axios from 'axios'
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

//添加班级信息(管理员显示权限不足？因为只有辅导员可以增删)
export const addClass = (data) => {
    return axios.post('/api/class/register', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}