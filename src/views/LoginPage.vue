// Created by whx
<template>
  <div class="container">
    <div class="login-img"></div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {}
  },
  methods: {},
  components: {}
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  min-height: 720px;
  overflow: auto;
  .login_img {
    background-image: url(/src/assets/images/login_banner.jpg);
    flex-grow: 1;
  }
}
</style>
