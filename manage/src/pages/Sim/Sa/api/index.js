import axios from 'axios'
export const winnerList = (params) => {
    return axios.get('/api/prizeStudent/list', {
        headers: { 'token': localStorage.getItem('token') },
        params: {
            page: 1,
            pageLimit: 20
        }
    })
}
export const addWinner = (data) => {
    return axios.post('/api/prizeStudent/add', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
