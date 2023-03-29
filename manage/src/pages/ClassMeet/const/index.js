// 根据要展示的数据来写，配合Table组件使用
export const columns = [
    {
        label: '班级ID',
        prop: 'classId'
    },
    {
        label: '开始班会时间',
        prop: 'startTime'
    },
    {
        label: '结束班会时间',
        prop: 'endTime'
    },
    {
        label: '',
        prop: 'subject'
    },
    {
        label: '',
        prop: 'contentRecord'
    },
    {
        label: '',
        prop: 'files'
    },
]
export const operaColums = [
    {
        label: '删除',
        type: 'danger'
    },
    {
        label: '修改',
        type: 'warning'
    }
]
