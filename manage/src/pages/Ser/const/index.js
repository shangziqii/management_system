export const columns = [
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
        prop: 'scholarshipTime',
    },
    {
        label: '按当前评定阶段',
        prop: 'status',
    },
    {
        label: '综测成绩记录',
        prop: 'files1',
        paper: true

    },
    {
        label: '奖学金发放记录',
        prop: 'files2',
        paper: true
    }
];

export const operaColums = [
    {
        label: '修改',
        type: 'warning',
        show: '1'
    },
    {
        label: '删除',
        type: 'danger',
        show: localStorage.getItem('role')
    }
]
