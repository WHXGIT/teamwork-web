<template>
  <div class="home-container">
    <div class="idx_split">
      <div class="idx_split_each">
        <el-card
          shadow="hover"
          class="idx_split_card"
          v-for="item in lanProjects"
          :key="item.id"
        >
          <div slot="header" class="clearfix">
            <span
              style="cursor: pointer; color: #3a8ee6;"
              @click="toProject(item.id)"
              >{{ item.name }}</span
            >
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="showProjectDetail(item.id)"
              >详情>></el-button
            >
          </div>
          <div>
            {{ item.desc }}
          </div>
        </el-card>
      </div>
      <div style="width: 1px; height: auto; background-color: #E2E7EF;"></div>
      <div class="idx_split_each">
        <el-card
          shadow="hover"
          class="idx_split_card"
          v-for="item in i18nProjects"
          :key="item.id"
        >
          <div slot="header" class="clearfix">
            <span
              style="cursor: pointer; color: #3a8ee6;"
              @click="toProject(item.id)"
              >{{ item.name }}</span
            >
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="showProjectDetail(item.id)"
              >详情>></el-button
            >
          </div>
          <div>
            {{ item.desc }}
          </div>
        </el-card>
      </div>
    </div>
    <el-dialog title="项目详情" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini"
          >取 消</el-button
        >
        <el-button type="primary" @click="dialogFormVisible = false" size="mini"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      msg: 'Hello Vue!',
      lanProjects: [{ id: '10001', name: 'bos-bd', desc: '行政区划' }],
      i18nProjects: [{ id: '1', name: 'bos-tc', desc: '翻译平台' }],
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  created() {},
  methods: {
    toProject(id) {
      this.$router.push({ name: 'SubmitRequest', query: { project_id: id } })
    },
    showProjectDetail() {
      this.dialogFormVisible = true
    },
    getLanProjects() {
      this.$cat
        .get('/tw-csl/list', {
          params: Object.assign(this.params, this.pageInfo)
        })
        .then(response => {
          if (response.status === 200) {
            let res = response.data.data
            this.tableData = res.list
            this.pageInfo.pageNum = res.pageNum
            this.pageInfo.pageSize = res.pageSize
            this.pageInfo.total = res.total
          } else {
            this.$message.error('网络异常！')
          }
        })
        .catch(error => {
          this.$message.error('服务器发生异常！')
        })
    },
    getI18nProjects() {
      this.$cat
        .get('/tw-csl/list', {
          params: Object.assign(this.params, this.pageInfo)
        })
        .then(response => {
          if (response.status === 200) {
            let res = response.data.data
            this.tableData = res.list
            this.pageInfo.pageNum = res.pageNum
            this.pageInfo.pageSize = res.pageSize
            this.pageInfo.total = res.total
          } else {
            this.$message.error('网络异常！')
          }
        })
        .catch(error => {
          this.$message.error('服务器发生异常！')
        })
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
.home-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  .idx_split {
    display: inline-flex;
    margin-top: 20px;
    width: 100%;
  }

  .idx_split_each {
    display: flex;
    width: 50%;
  }

  .idx_split_card {
    margin: 5px 5px;
    width: 33%;
  }
}
</style>
