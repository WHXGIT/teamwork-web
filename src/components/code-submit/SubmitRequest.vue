// Created by whx
<template>
  <div class="sr-container">
    <el-card shadow="never">
      <div class="code-submit-condition">
        <label class="code-submit-label">提交人：</label>
        <div class="code-submit-fill">
          <el-select
            v-model="creator"
            clearable
            placeholder="请选择提交人"
            size="mini"
          >
            <el-option
              v-for="item in creators"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <label class="code-submit-label">关键字：</label>
        <div class="code-submit-fill">
          <el-input placeholder="请输入关键字" v-model="keyword" size="mini">
          </el-input>
        </div>
        <label class="code-submit-label">时间范围：</label>
        <div class="code-submit-fill">
          <el-date-picker
            size="mini"
            clearable
            v-model="date"
            type="daterange"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
        <div class="code-submit-fill" style="margin-left: 20px;">
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="getList"
            >搜索</el-button
          >
        </div>
      </div>
    </el-card>

    <el-divider></el-divider>
    <div class="button-operate-scope">
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-document-add"
        @click="createHandle"
        >新增申请单</el-button
      >
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-download"
        v-if="false"
        @click="download"
        >下载申请单</el-button
      >
    </div>
    <div class="table-page-component">
      <el-tabs type="border-card" v-model="requestType" lazy="true">
        <el-tab-pane
          :label="item.label"
          :name="item.value"
          v-for="(item, index) in requestTypeEnum"
          :key="index"
        >
          <table-page
            :params="params"
            :key="index"
            ref="tablepage"
            @modify="modify"
            v-if="requestType === item.value"
          ></table-page>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog title="创建提交申请" :visible.sync="createVisible" width="50%">
      <form-list
        :creators="creators"
        :params="params"
        @refresh="refresh"
      ></form-list>
    </el-dialog>
    <el-dialog title="修改提交申请" :visible.sync="modifyVisible" width="50%">
      <form-list
        :creators="creators"
        :params="params"
        ref="modifyformlist"
        @refresh="refresh"
      ></form-list>
    </el-dialog>
  </div>
</template>

<script>
import FormList from '@/components/code-submit/FormList'
import TablePage from '@/components/code-submit/TablePage'
export default {
  name: 'SubmitRequest',
  data() {
    return {
      requestTypeEnum: [
        { label: '分支到主干', value: '1' },
        { label: '同步至基线', value: '2' }
      ],
      createVisible: false,
      modifyVisible: false,
      requestType: '1',
      date: '',
      creator: '',
      keyword: '',
      creators: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一个月',
            onClick: function(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick: function(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  computed: {
    params() {
      return {
        requestType: this.requestType,
        startTime: this.startTime,
        endTime: this.endTime,
        creator: this.creator,
        keyword: this.keyword,
        projectId: this.$route.query.project_id
      }
    },
    startTime() {
      return this.date instanceof Array ? this.date[0] : ''
    },
    endTime() {
      return this.date instanceof Array ? this.date[1] : ''
    }
  },
  created: function() {
    this.listUsers()
  },

  methods: {
    refresh() {
      this.createVisible = false
      this.modifyVisible = false
      this.getList()
    },
    getList() {
      this.$refs.tablepage[0].getList()
    },
    listUsers: function() {
      var _this = this
      this.$cat
        .get('/user/users')
        .then(response => {
          if (response.status === 200) {
            let users = response.data.data
            _this.creators = users
          } else {
            _this.$message.error('网络异常！')
          }
        })
        .catch(error => {
          _this.$message.error('服务器发生异常！')
        })
    },
    modify(id) {
      this.modifyVisible = true

      this.$cat
        .get('/tw-csl/lists/list/' + id)
        .then(response => {
          if (response.status === 200) {
            let ruleForm = response.data.data
            this.$refs.modifyformlist.initEditRuleForm(ruleForm)
          } else {
            this.$message.error('网络异常！')
          }
        })
        .catch(error => {
          this.$message.error('服务器发生异常！')
        })
    },
    createHandle: function() {
      this.createVisible = true
    },

    download: function() {
      let a = document.createElement('a')
      let href =
        '/tw-csl/download?bugNo=' +
        this.bugNo +
        '&creator=' +
        this.creator +
        '&keyword=' +
        this.keyword +
        '&startTime=' +
        this.startTime +
        '&endTime=' +
        this.endTime
      // a.setAttribute('download','代码提交申请单')
      a.setAttribute('href', href)
      a.setAttribute('download', '') // download属性
      a.click() // 自执行点击事件
    },
    enter(index) {
      console.warn('enter')
    },
    leave() {
      console.warn('leave')
    }
  },
  components: {
    FormList,
    TablePage
  }
}
</script>

<style scoped lang="scss">
.sr-container {
  width: 100%;
  height: 100%;
  .el-divider--horizontal {
    margin: 10px 0;
  }
  .table-page-component {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .button-operate-scope {
    margin: 15px 10px 7px 0;
  }

  .page-select-down .el-select-dropdown {
    max-width: 180px;
  }

  .code-submit-label {
    display: inline-flex;
    height: 28px;
    margin-left: 30px;
    line-height: 28px;
    text-align: center;
    font-size: 14px;
  }

  .code-submit-fill {
    display: inline-flex;
  }

  .code-submit-condition {
    width: 100%;
    display: flex;
    margin: 5px;
  }

  .span-break-line {
    white-space: pre-line;
  }
}
</style>
