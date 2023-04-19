export const columns = [
    {
        label: '学生学号',
        prop: 'studentNum'
    },
    {
        label: '学生姓名',
        prop: 'studentName'
    },
    {
        label: '学生班级',
        prop: 'className'
    },
    {
        label: '处分名称',
        prop: 'punishName'
    },
    {
        label: '处分等级',
        prop: 'punishLevel'
    },
    {
        label: '处分时间',
        prop: 'punishTime'
    },
    {
        label: '备注',
        prop: 'remarks'
    },
    {
        label: '相关文件',
        prop: 'files',
        paper: true
    }
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
//获取文件类型对应图标
export const getFileIcon = (filePath) => {
    const extension = filePath.split('.').pop();
    console.log(extension);
    switch (extension) {
        case 'jpg':
            return require('@/assets/img/JPG.png')
        case 'png':
            return require('@/assets/img/PNG.png')
        case 'pdf':
            return require('@/assets/img/Pdf.png')
        case 'xlsx':
            return require('@/assets/img/xlsx.png')
        case 'doc':
            return require('@/assets/img/doc.png')
        case 'docx':
            return require('@/assets/img/docx.png')
        case 'ppt':
            return require('@/assets/img/ppt.png')
        case 'pptx':
            return require('@/assets/img/pptx.png')
        // 其他文件类型的判断逻辑
        default:
            return require('@/assets/img/other.png');
    }
}

//获取文件name