<template>
  <div class="tabel">
    <el-dialog title="文件列表" :visible.sync="centerDialogVisible" width="30%" center>
      <div v-for="item in listFiles" :key="item">
        <a :href="item" download>
          <img :src="getFileIcon(item)" alt="file icon" style="width:50px;height:50px;">{{ getFileName(item) }}
        </a>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-card>
      <el-table :data="tableData" style="margin:0;" >
        <!--数据列表展示部分-->
        <el-table-column v-for="item in tableColumns" :key="item.prop" :prop="item.prop" :label="item.label"
          :width="item.width" align="center">
          <template slot-scope="scope">
            <!-- 自定义奖状电子版列 -->
            <template v-if="item.avatar">
              <img :src="scope.row[item.prop]" style="max-width: 100px; max-height: 100px;"
                @click="previewFile(scope.row[item.prop])" v-if="scope.row[item.prop]">
              <span v-else>-</span>
            </template>

            <!-- 自定义显示文件 -->
            <template v-else-if="item.paper">
              <!-- <a :href="scope.row[item.prop]" style="max-width: 100px; max-height: 100px;"></a> -->
              <!-- <button v-show="scope.row[item.prop]" @click="previewFile(scope.row[item.prop])">预览文件</button> -->
              <el-button type="primary" plain size="small" v-show="scope.row[item.prop]" @click="previewFile(scope.row[item.prop])" v-if="scope.row[item.prop]">预览文件</el-button>
              <span v-else>-</span>
            </template>

            <!-- 默认列 -->
            <template v-else>
              {{ scope.row[item.prop]? scope.row[item.prop] : '-' }}
              <!-- {{ scope.row[item.prop] }} -->
            </template>
          </template>
        </el-table-column>
        <!-- 操作按钮部分-->
        <el-table-column v-if="operaColums.length > 0" fixed="right" label="操作" align="center"
          :width="operaColums.length * 80">
          <template slot-scope="scope">
            <el-button v-for="(item, index) in operaColums" :key="item.label" :type="item.type"
              @click="btnClick(scope.row, index)" plain size="small" v-show="getShowDelet(item)">{{ item.label }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination style="margin: 40px 0 10px 30px;" background @size-change="pageSizeChange"
        @current-change="currentChange" :current-page="currentPage" :page-sizes="pageSize" :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>
  
<script>
export default {
  name: "ImgTabels",
  props: {
    tableData: { type: Array, default: () => [] },
    tableColumns: { type: Array, default: () => [] },
    isShow: { type: Boolean, default: () => false },
    operaColums: { type: Array, default: () => [] },
    currentPage: { type: Number, default: () => 1 },     //当前页
    limit: { type: Number, default: () => 5 },       //分页数
    total: { type: Number, default: () => 0 },         //总条数     
  },
  data() {
    return {
      pageSize: [5, 10, 20], //页数选择
      centerDialogVisible: false,
      filePath: '',
      listFiles: []
    };
  },
  mounted() {
  },
  methods: {
    // 条数选择
    pageSizeChange(val) {
      this.$emit('changeLimit', val);
    },
    // 当前页选择
    currentChange(val) {
      this.$emit('changePage', val);
    },
    // 操作按钮
    btnClick(e, idx) {
      this.$emit("click_" + (idx + 1), e)
    },
    //点击按钮进行预览文件
    /*  previewFile(file) {
       // console.log(file);
       window.open(file);
     }, */
    previewFile(file) {
      // console.log(file);
      // window.open(file);
      this.centerDialogVisible = true
      this.filePath = file
      this.listFiles = this.filePath.split(',')
      console.log(this.listFiles);
    },

    //获取文件类型对应图标
    getFileIcon(filePath) {
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
    },
    getFileName(filePath) {
      return filePath.split('/').pop();
    },
    //判断是否显示删除按钮的权限
    getShowDelet(item) {

      if ((item.show === '0' || item.show === '2') && (this.$route.path === '/Main/Gar' || this.$route.path === '/Main/Ser')) {
        return false
      }
      else {
        return true
      }
    }
  },
  /*   watch: {
      '$route.path': function () {
        console.log('gaibianbauisia');
        this.showDelet = this.getShowDelet();
        this.$forceUpdate();//强制刷新页面
      },
      '$storage.role': function () {
        this.showDelet = this.getShowDelet();
        this.$forceUpdate();
      }
    }, */
  computed: {
    showDelet() {
      return this.getShowDelet();
    }
  },
  mounted() {
    // this.$forceUpdate(); 
  }
};
</script>
  
<style scoped>
/* 调整对话框标题样式 */
.el-dialog__title {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
  /* 将标题下方的 margin 调整为 10px */
}

/* 调整对话框内容样式 */
.el-dialog__body>div:first-child {
  margin-top: -105px;
  /* 将第一个 div 元素的 margin-top 值设为 0 */
}

/* 调整对话框内容样式 */
.el-dialog__body>div {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 20px;
}

.el-dialog__body a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #666;
}

.el-dialog__body img {
  margin-right: 10px;
}

.el-dialog__body a:hover {
  color: #409EFF;
}

.el-dialog__body>div {
  display: flex;
  align-items: center;
  margin-bottom: -80px;
}

/* 调整对话框底部按钮样式 */
.dialog-footer {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
}

.dialog-footer .el-button {
  width: 100px;
  height: 40px;
  font-size: 16px;
}

.dialog-footer .el-button:first-child {
  background-color: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
}

.dialog-footer .el-button:last-child {
  background-color: #409EFF;
  border: none;
  color: #fff;
}

.dialog-footer .el-button:last-child:hover {
  background-color: #66b1ff;
}

.tabel{
  /* max-height: calc(100vh - 200px); */
}
.el-table__header-wrapper {
  height: 20px!important;
}

.el-table__header tr th {
  height: 20px!important;
}

</style>
  