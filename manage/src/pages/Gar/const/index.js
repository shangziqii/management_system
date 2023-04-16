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
        label: '相关文件',
        prop: 'files',
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
    },


]