// Created by whx
<template>
  <div class="tp-container">
    <div class="table-body">
      <el-table
        :data="tableData"
        :row-class-name="tableRowClassName"
        :v-loading="loading"
        size="mini"
      >
        <el-table-column type="expand" fixed="left">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="提交时间">
                <span v-html="props.row.createTime"></span>
              </el-form-item>
              <el-form-item label="提交人">
                <span v-html="props.row.creator"></span>
              </el-form-item>
              <el-form-item label="Sonar扫描">
                <span>{{ props.row.sonar | selfTestFilter }}</span>
              </el-form-item>
              <el-form-item label="单元测试">
                <span>{{ props.row.unitTest | selfTestFilter }}</span>
              </el-form-item>
              <el-form-item label="冒烟测试">
                <span>{{ props.row.smokeTest | smokeTestFilter }}</span>
              </el-form-item>
              <el-form-item label="代码评审">
                <span>{{ props.row.codeReview | selfTestFilter }}</span>
              </el-form-item>
              <el-form-item label="Java文件名">
                <span
                  class="span-break-line"
                  v-html="props.row.javaFiles"
                ></span>
              </el-form-item>
              <el-form-item label="修改说明">
                <span
                  class="span-break-line"
                  v-html="props.row.codeModifyDesc"
                ></span>
              </el-form-item>
              <el-form-item label="元数据文件">
                <span
                  class="span-break-line"
                  v-html="props.row.metaFiles"
                ></span>
              </el-form-item>
              <el-form-item label="影响范围">
                <span class="span-break-line" v-html="props.row.scope"></span>
              </el-form-item>
              <el-form-item label="数据库脚本">
                <span
                  class="span-break-line"
                  v-html="props.row.dbScript"
                ></span>
              </el-form-item>
              <el-form-item label="备注">
                <span class="span-break-line" v-html="props.row.remark"></span>
              </el-form-item>
              <el-form-item label="数据状态">
                <span>{{ props.row.status | statusFilter }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column label="提交时间" prop="createTime" width="150">
        </el-table-column>
        <el-table-column label="提交人" prop="creator" width="60">
        </el-table-column>
        <el-table-column
          label="修改说明"
          prop="codeModifyDesc"
          width="150"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="影响范围"
          prop="scope"
          width="150"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="Sonar扫描" width="100">
          <template slot-scope="scope">{{
            scope.row.sonar | smokeTestFilter
          }}</template>
        </el-table-column>
        <el-table-column label="单元测试" width="100">
          <template slot-scope="scope">{{
            scope.row.unitTest | smokeTestFilter
          }}</template>
        </el-table-column>
        <el-table-column label="冒烟测试" width="100">
          <template slot-scope="scope">{{
            scope.row.smokeTest | smokeTestFilter
          }}</template>
        </el-table-column>
        <el-table-column label="代码评审" width="100">
          <template slot-scope="scope">{{
            scope.row.codeReview | smokeTestFilter
          }}</template>
        </el-table-column>
        <el-table-column
          label="备注"
          prop="remark"
          width="150"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="数据状态" width="100">
          <template slot-scope="scope">{{
            scope.row.status | statusFilter
          }}</template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="300">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 0">
              <el-button size="mini" @click="handleEdit(scope.row)"
                >编辑
              </el-button>
              <el-button
                size="mini"
                type="success"
                @click="handleFinish(scope.row.id)"
                >完成
              </el-button>
              <el-button
                size="mini"
                type="warning"
                @click="handleGiveUp(scope.row.id)"
                >废弃
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.id)"
                >删除
              </el-button>
            </div>
            <div v-if="scope.row.status === 2">
              <el-button
                size="mini"
                type="primary"
                @click="handleRecovery(scope.row.id)"
                >恢复
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-select-down">
      <el-pagination
        @size-change="handleSizeChange"
        background
        small
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageNum"
        :page-sizes="[15, 50, 100, 500]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TablePage',
  props: {
    params: Object
  },
  data() {
    return {
      loading: true,
      formLabelWidth: '120px',
      tableData: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 15,
        total: 0
      }
    }
  },
  filters: {
    selfTestFilter: function(val) {
      if (val === 0) {
        return '否'
      } else {
        return '是'
      }
    },
    smokeTestFilter: function(val) {
      if (val === 0) {
        return '否'
      } else {
        return '是'
      }
    },
    statusFilter: function(val) {
      var result = ''
      if (val === 0) {
        result = '草稿'
      } else if (val === 1) {
        result = '完成'
      } else if (val === 2) {
        result = '废弃'
      } else if (val === 3) {
        result = '删除'
      }
      return result
    }
  },
  created: function() {
    this.getList()
  },
  methods: {
    tableRowClassName: function({ row, rowIndex }) {
      var status = row.status
      if (status === 0) {
        return ''
      } else if (status === 1) {
        return 'success-row'
      } else if (status === 2) {
        return 'giveup-row'
      } else if (status === 3) {
        return ''
      } else {
        return ''
      }
    },
    handleEdit: function(rows) {
      var bakRuleForm = JSON.stringify(rows)
      var rowJsonBak = JSON.parse(bakRuleForm)
      if (rowJsonBak.isSelfTest === 1) {
        rowJsonBak.isSelfTest = true
      }
      if (rowJsonBak.smokeTest === 1) {
        rowJsonBak.smokeTest = true
      }
      this.$refs.modifyFormList.initEditRuleForm(rowJsonBak)
      this.modifyVisible = true
    },
    handleFinish: function(id) {
      var _this = this
      this.$cat
        .put('/tw-csl/code-submit-list/finish/' + id)
        .then(function(response) {
          if (response.status === 200) {
            _this.getList()
          } else {
            _this.$message.error('网络异常！')
          }
        })
        .catch(function(error) {
          _this.$message.error('服务器发生异常！')

          console.warn(error)
        })
    },
    handleGiveUp: function(id) {
      var _this = this
      this.$cat
        .put('/tw-csl/code-submit-list/give-up/' + id)
        .then(function(response) {
          if (response.status === 200) {
            _this.getList()
          } else {
            _this.$message.error('网络异常！')
          }
        })
        .catch(function(error) {
          _this.$message.error('服务器发生异常！')
          console.warn(error)
        })
    },
    handleRecovery: function(id) {
      var _this = this
      this.$cat
        .put('/tw-csl/code-submit-list/recovery/' + id)
        .then(function(response) {
          if (response.status === 200) {
            _this.getList()
          } else {
            _this.$message.error('网络异常！')
          }
        })
        .catch(function(error) {
          _this.$message.error('服务器发生异常！')
          console.warn(error)
        })
    },
    handleDelete: function(id) {
      var _this = this
      this.$cat
        .delete('/tw-csl/code-submit-list/delete/' + id)
        .then(function(response) {
          if (response.status === 200) {
            _this.getList()
          } else {
            _this.$message.error('网络异常！')
          }
        })
        .catch(function(error) {
          _this.$message.error('服务器发生异常！')
          console.warn(error)
        })
    },
    handleSizeChange: function(pageSize) {
      this.pageInfo.pageSize = pageSize
      this.getList()
    },
    handleCurrentChange: function(pageNum) {
      this.pageInfo.pageNum = pageNum
      this.getList()
    },
    getList() {
      let _this = this
      this.loading = true
      this.$cat
        .get('/tw-csl/list', {
          params: Object.assign(this.params, this.pageInfo)
        })
        .then(function(response) {
          if (response.status === 200) {
            var res = response.data.data
            _this.tableData = res.list
            _this.pageInfo.pageNum = res.pageNum
            _this.pageInfo.pageSize = res.pageSize
            _this.pageInfo.total = res.total
            _this.loading = false
          } else {
            _this.$message.error('网络异常！')
          }
        })
        .catch(function(error) {
          _this.$message.error('服务器发生异常！')
          _this.loading = false
          console.warn(error)
        })
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
.tp-container {
  width: 100%;
  height: 670px;
  display: flex;
  flex-direction: column;
  .table-body {
    min-height: 650px;
    overflow: auto;
  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .demo-table-expand {
    width: 60%;
    font-size: 0;
  }

  .demo-table-expand .el-form-item__content {
    padding-top: 10px;
    line-height: 20px;
    position: relative;
    font-size: 14px;
  }

  .demo-table-expand label {
    width: 100px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .button-operate-scope {
    margin: 5px 10px;
  }

  .el-table .giveup-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .page-select-down .el-select-dropdown {
    max-width: 180px;
  }

  .code-submit-label {
    display: inline-flex;
    width: 8%;
    height: 28px;
    margin-left: 5%;
    line-height: 28px;
    text-align: center;
    font-size: 14px;
  }

  .code-submit-fill {
    display: inline-flex;
    width: 15%;
  }

  .code-submit-condition {
    display: flex;
    padding-top: 20px;
    margin: 5px;
    height: 28px;
  }

  .span-break-line {
    white-space: pre-line;
  }
}
</style>
