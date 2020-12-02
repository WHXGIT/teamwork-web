<template>
  <div class="app-container">
    <div class="common-header">
      <header-bar></header-bar>
    </div>
    <div class="app-page">
      <div class="app-page-main">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import HeaderBar from '@/components/HeaderBar'
export default {
  name: 'APP',
  data() {
    return {}
  },
  methods: {},
  components: { HeaderBar }
}
</script>

<style scoped lang="scss">
.app-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  .common-header {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .app-page {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .app-page-main {
      width: 90%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
}
</style>
