<template>
    <el-dialog title="选择导出参数" :visible.sync="isShow" width="30%" :before-close="handleClose">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
    </el-checkbox-group>
    <el-button type="primary" @click="submitSelect('checkedCities')">提交</el-button>
</el-dialog>
  </template>
  <script>
    export default {
        name: 'ExportStudentInfo',
        props: {
            isShow: { type: Boolean , default: () => false},//这里接收是否展示的参数
            cityOptions:{ type: Array, default: () => []},//这里接收显示的数据
        },
      data() {
        return {
          checkAll: false,
          checkedCities: [],
          cities: this.cityOptions,
          isIndeterminate: true
        };
      },
      methods: {
        handleClose() {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$emit('change')
            this.checkedCities=[];
            this.checkAll=false;
          })
          .catch(_ => {});
      },
        handleCheckAllChange(val) {
          this.checkedCities = val ? this.cities : [];
          this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
          let checkedCount = value.length;
          this.checkAll = checkedCount === this.cities.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
      submitSelect(){
        console.log(this.checkedCities);
        if (this.checkedCities.length!==0) {
            const values = this.checkedCities;
            this.$emit('submit',values)
          } else {
            this.$message({
              type: 'error',
              message: '请完善表单数据!',
            })
            return false;
          }
      }
      }
    };
  </script>