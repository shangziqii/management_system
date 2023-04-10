// 困难类型选项
export const options = [
    {
        label: '普困',
        value: '普困',
    },
    {
        label: '特困',
        value: '特困',
    },
];

// 列表数据栏配置项
export const columns = [
    {
        label: '学号',
        prop: 'studentNum',
    },
    {
        label: '学生姓名',
        prop: 'studentName'
    },
    {
        label: '困难等级',
        prop: 'difficultLevel',
    },
    {
        label: '个人情况',
        prop: 'situation',
    },
    {
        label: '备注',
        prop: 'remarks',
    },
];

// 操作栏配置
export const operaColumns = [
    {
        label: '删除',
        type: 'danger',
    },
    {
        label: '修改',
        type: 'warning',
    },
    {
        label: '详情',
        type: 'primary'
    },
]