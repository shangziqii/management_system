<template>
  <el-card class="tabel">
    <el-table :data="tableData" style="margin:0;">
      <!--数据列表展示部分-->
      <el-table-column v-for="item in tableColumns" :key="item.prop" :prop="item.prop" :label="item.label"
        :width="item.width" align="center">
        <template slot-scope="scope">
          <span v-if="Array.isArray(scope.row[item.prop])&&scope.row[item.prop].length>0">{{
            scope.row[item.prop].join(', ') }}</span>
          <span v-else-if="Array.isArray(scope.row[item.prop])&&scope.row[item.prop].length===0">{{ '-' }}</span>
          <span v-else>{{ scope.row[item.prop] || '-' }}</span>
        </template>
      </el-table-column>

      <!-- 操作按钮部分-->
      <el-table-column v-if="operaColums.length > 0" fixed="right" label="操作" align="center"
        :width="operaColums.length * 80">
        <template slot-scope="scope">
          <el-button v-for="(item, index) in operaColums" :key="item.label" :type="item.type"
            @click="btnClick(scope.row, index)" plain size="small">{{ item.label }}
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
</template>

<script>
export default {
  name: "tables",
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
    }
  }
};
</script>

<style scoped>
.tabel{
  max-height: calc(100vh - 200px);
  /* max-height: 100vh; */
  /* line-height: 70px; */
  line-height: 110px;
  overflow-y: scroll;
}
</style>
