<template>
  <div class="main"> 
    <el-container style="width:100%; height:100%">
      <el-aside width="270px">
       <!--  <el-menu :default-active="active" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router> -->
          <el-menu :default-active="active" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
          <h3>管理系统</h3>
          <el-menu-item v-for="item in noChildren" v-show="item.name !== 'Am' || (item.name === 'Am' && roleShow != 2)"
            :key="item.name" :index="item.name" @click="clickMenu(item)" :style="{ color: active === item.path ? activeColor : '' }">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
          </el-menu-item>

          <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
            <template slot="title">
              <i :class="`el-icon-${item.icon}`"></i>
              <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.label">
              <el-menu-item :index="subItem.label" @click="clickMenu(subItem)" :style="{ color: active === subItem.path ? activeColor : '' }">{{ subItem.label }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>


        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 左侧header -->
          <div class="l-content">
            <!-- <el-button icon="el-icon-menu" size="mini"></el-button> -->
            <div>
              <img src="./../../assets/img/logo_jw_w.png" alt="">
            </div>
          </div>
          <!-- 右侧header -->

          <div class="r-content">
            <el-dropdown>
              <span class="el-dropdown-link">
                <span class="el-icon-user-solid"></span><i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="quitUser()">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="l-content">
            <!-- 面包屑部分 -->
            <!-- <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb> -->
          </div>
        </el-header>
        <CommonTag />
        <div class="mainContent">
          <el-main>
            <router-view>
            </router-view>
          </el-main>
        </div>

      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CommonTag from '../../components/Tags/CommonTag.vue';
import { checkToken } from './api/index'
export default {
  name: 'Main',
  components: {
    CommonTag
  },
  data() {
    return {
      menuData: [
        {
          path: "/Main/Pim",
          name: "Pim",
          label: "个人信息管理",
          icon: "user-solid",
          index: "/Main/Pim",
        },
        {
          path: "/Main/Am",
          name: "Am",
          label: "账号管理",
          icon: "s-order",
          url: "/Main/Am",
          disabled: true
        },
        {
          path: "/Main/Cim",
          name: "Cim",
          label: "班级信息管理",
          icon: "tickets",
          url: "/Main/Cim",
        },
        {
          path: "/Main/Sim",
          name: "Sim",
          label: "学生信息管理",
          icon: "s-custom",
          url: "/Main/Sim",
          children: [
            {
              path: "/Main/Sim/Bsi",
              name: "Bsi",
              label: "基本学生信息",
              icon: "tickets",
              url: "/Main/Cim",
            },
            {
              path: "/Main/Sim/Dsi",
              name: "Dsi",
              label: "困难生信息",
              icon: "tickets",
              url: "/Main/Sim/Dsi",
            },
            {
              path: "/Main/Sim/sa",
              name: "Sa",
              label: "学生获奖情况",
              icon: "tickets",
              url: "/Main/Sim/sa",
            },
            {
              path: "/Main/Sim/Svrad",
              name: "Svrad",
              label: "学生违规乱纪情况",
              icon: "tickets",
              url: "/Main/Sim/Svrad",
            },
            {
              path: '/Main/Sim/Pm',
              name: 'Pm',
              label: '学生党员信息',
              icon: 'tickets',
              url: '/Main/Sim/Pm'
            }
          ]
        },
        {
          path: "/Main/Gar",
          name: "Gar",
          label: "助学金评定记录",
          icon: "s-order",
          url: "/Main/Gar",
        },
        {
          path: "/Main/Ser",
          name: "Ser",
          label: "奖学金评定记录",
          icon: "s-order",
          url: "/Main/Ser",
        },
      ],
      active:'/Main/Pim',
      activeColor: "#ffd04b" // 设置默认颜色为红色
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    clickMenu(item) {
      this.active=item.path
      window.sessionStorage.setItem("activeRouter",item.path)
      if (this.$route.path !== item.path) {
        this.$router.push(item.path)
      }
      // 调用mutation来操作面包屑
      this.$store.commit('selectMenu', item)

    },
    quitUser() {
      this.$confirm(`是否确认退出`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token')
        this.$router.push('/Login');
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出'
        });
      });
    },
  },
  computed: {
    // 没有子菜单
    noChildren() {
      return this.menuData.filter(item => !item.children)
    },
    // 有子菜单
    hasChildren() {
      return this.menuData.filter(item => item.children)
    },
    ...mapState({
      tags: state => state.detail.tabsList
    }),
    //接收vuex中获取的权限状态，来进行条件禁用侧边栏的项目
    roleShow() {
      return this.$store.state.showNav.permission
    }


    /*     activeRoute() {
          return this.$route.path;
        } */
  },
  mounted(){
    this.active=window.sessionStorage.getItem("activeRouter")

  }
}
</script>

<style scoped>
/* 隐藏侧边导航栏下边的滚动条 */
.el-aside::-webkit-scrollbar {
  display: none;
}

.r-content {
  
  position: absolute;
  right: 10px;
  width: 50px;
}

.l-content {
  position: absolute;
  left: 10px;
  top: 5px;
  /* width: 50px; */
}

.el-dropdown-link {
  cursor: pointer;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.el-button {
  position: absolute;
  top: 15px;
  left: 20px;
}

.el-breadcrumb {
  position: absolute;
  top: 25px;
  left: 80px;
}

.el-header,
.el-footer {
  height: 60px;
  color: #333;
  text-align: center;
  line-height: 60px;
  background-color: #22305a;
  padding: 0;
  position: relative;
}

.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {

  background-color: rgb(255, 255, 255);
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 270px;
  min-height: 400px;
}

.el-menu {
  height: 100vh;
}

.el-menu h3 {
  color: aliceblue;
  text-align: center;
  line-height: 48px;
}

.l-content /deep/ .el-breadcrumb__item .el-breadcrumb__inner {
  font-weight: normal;

}

.l-content /deep/ .el-breadcrumb__item .el-breadcrumb__inner.is-link {
  color: #666;
}

.l-content /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner {
  /* color: #fff; */
  color: #000;
}

.mainContent {
  margin-top: 60px;
}

.el-breadcrumb[data-v-c9c526c0] {
  position: absolute;
  /* top: 59px; */
  top: 77px;
  left: 4px;
  z-index: 15;
  width: 1000px;
}

.tabs[data-v-7a918e6e] {
  position: absolute;
  left: 293px;
  /* top: 67px; */
  top: 103px;
  margin: 10px 0;
  z-index: 1;
}

/* 新增 */
/* .el-menu-item.active,
.el-submenu.is-active > .el-submenu__title {
  background-color: #409EFF;
  color: #fff;
} */

/* .el-menu-item.is-active {
          color: #6681FA!important;
          background-color: #EAEEFF!important;
        } */
.el-menu-item {
  color:white;
}

</style>