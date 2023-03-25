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