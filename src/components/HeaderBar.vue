// Created by whx
<template>
  <div class="container">
    <div class="common-header-logo"></div>
    <el-menu
      :default-active="$route.path"
      class="common-header"
      mode="horizontal"
      :router="true"
    >
      <el-menu-item index="/">项目</el-menu-item>
      <el-menu-item index="/submit-request">提交申请</el-menu-item>
      <el-menu-item index="/test-case">测试用例</el-menu-item>
      <el-menu-item index="/config-mgmt">配置管理</el-menu-item>
      <el-menu-item index="/backup">备忘录</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  data() {
    return {
      activeIndex: '/'
    }
  },
  mounted() {},
  methods: {},
  components: {}
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: 5px 0;
  background: #ffffff;
  border-bottom: solid 1px #e6e6e6;
  .common-header {
    display: inline-flex;
    height: 50px;
    line-height: 50px;
    margin: -6px 0 0 40px;
  }
  .common-header-logo {
    display: inline-flex;
    background: url('../assets/images/logo.png') no-repeat;
    background-size: cover;
    width: 119px;
    height: 36px;
  }
  .el-menu--horizontal > .el-menu-item {
    height: 50px;
    line-height: 50px;
  }

  .el-menu--horizontal > .el-menu-item.is-active {
    color: #3691f0 !important;
  }
  .el-menu.el-menu--horizontal {
    border: none;
  }
}
</style>
