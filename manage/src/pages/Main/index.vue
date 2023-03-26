<template>
  <div class="main">
    <el-container style="width:100%; height:100%">
      <el-aside width="200px">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
           background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
          <h3>管理系统</h3>
          <el-menu-item v-for="item in noChildren" :key="item.name" :index="item.name" @click="clickMenu(item)">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
          </el-menu-item>

          <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
            <template slot="title">
              <i :class="`el-icon-${item.icon}`"></i>
              <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.label">
              <el-menu-item :index="subItem.label" @click="clickMenu(subItem)">{{ subItem.label }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 助学金评定记录 -->
          <el-menu-item index="/Main/Gar">
            <i class="el-icon-menu"></i>
            <span slot="title">助学金评定记录</span>
          </el-menu-item>
          <!-- 奖学金评定记录 -->
          <el-menu-item index="/Main/Ser">
            <i class="el-icon-document"></i>
            <span slot="title">奖学金评定记录</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 左侧header -->
<!--           <div class="l-content">
            <el-button icon="el-icon-menu" size="mini"></el-button>
          </div> -->
          <!-- 右侧header -->
          <div class="r-content">
            <el-dropdown>
              <span class="el-dropdown-link">
                <span class="el-icon-user-solid"></span><i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人空间</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>
        <el-main>
          <router-view>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Main',
  components: {

  },
  data() {
    return {
      menuData: [
        {
          path: "/Main/Pim",
          name: "Pim",
          label: "个人信息管理",
          icon: "user-solid",
          url: "/Main/Pim",
        },
        {
          path: "/Main/Am",
          name: "Am",
          label: "账号管理",
          icon: "s-order",
          url: "/Main/Am",
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
          ]
        }/* ,
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
        }, */
      ]
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
      if (this.$route.path !== item.path) {
        this.$router.push(item.path)
      }
      // this.$store.commit('selectMenu', item)
    }
  },
  computed: {
    // 没有子菜单
    noChildren() {
      return this.menuData.filter(item => !item.children)
    },
    // 有子菜单
    hasChildren() {
      return this.menuData.filter(item => item.children)
    }
  }
}
</script>

<style scoped>
.r-content{
  position:absolute;
  right:10px;
  width: 50px;
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
  background-color: #c5c5c5;
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
  width: 200px;
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
</style>