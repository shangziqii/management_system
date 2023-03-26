import axios from 'axios';

// 查看学生基本信息列表
export const getList = ( params ) => {
    return axios.get('/api/student/list',{
        headers: { 'token': localStorage.getItem('token')},
        params
    })
}

// 新增学生基本信息
export const addStudent = ( params ) => {
    return axios.post('/api/student/add',params,{
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    }
    )
}

// 删除学生基本信息
export const deleteStudent = ( params ) => {
    return axios.post('/api/student/delete',params,{
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}

// 修改学生基本信息
export const modifyStu = ( params ) => {
    return axios.post('/api/student/modify',params,{
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}