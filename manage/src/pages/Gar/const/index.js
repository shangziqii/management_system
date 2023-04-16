export const columns = [
    // {
    //     label: '班级ID',
    //     prop: 'classId',
    // },
    {
        label: '专业',
        prop: 'major',
    },
    {
        label: '年级',
        prop: 'grade',
    },
    {
        label: '评定的时间范围',
        prop: 'subsidiesTime',
    },
    {
        label: '当前评定阶段',
        prop: 'status',
    },
];

export const operaColums = [
    {
        label: '编辑',
        type: 'warning',
        // 删除权限
        // show: '1'
    },
    {
        label: '删除',
        type: 'danger',
        // 删除权限
        // show: localStorage.getItem('role')
    }
]