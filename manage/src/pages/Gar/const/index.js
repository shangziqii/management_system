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
    {
        label: '文件一',
        prop: 'files1',
        paper: true
    },
    {
        label: '文件二',
        prop: 'files2',
        paper: true
    },
    {
        label: '文件三',
        prop: 'files3',
        paper: true
    },
];

export const operaColums = [
    {
        label: '编辑',
        type: 'warning',
    },
    {
        label: '删除',
        type: 'danger',
        // 删除权限
        show: localStorage.getItem('role')
    }
]