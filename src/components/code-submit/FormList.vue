// Created by whx
<template>
  <div class="fl-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="申请人" prop="creator">
        <el-select
          v-model="ruleForm.creator"
          placeholder="请选择申请人"
          size="mini"
        >
          <el-option
            v-for="(item, index) in creators"
            :label="item.label"
            :value="item.value"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提交目标" prop="submitTarget">
        <el-checkbox v-model="toTrank">分支到主干</el-checkbox>
        <el-checkbox v-model="toBaseline">同步至基线</el-checkbox>
      </el-form-item>
      <el-form-item label="代码修改说明" prop="codeModifyDesc">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 10 }"
          v-model="ruleForm.codeModifyDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="影响范围" prop="scope">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 10 }"
          v-model="ruleForm.scope"
        ></el-input>
      </el-form-item>
      <div class="switch-test-group">
        <el-form-item label="Sonar扫描" prop="sonar" class="switch-test-item">
          <el-switch v-model="ruleForm.sonar"></el-switch>
        </el-form-item>
        <el-form-item label="单元测试" prop="unitTest" class="switch-test-item">
          <el-switch v-model="ruleForm.unitTest"></el-switch>
        </el-form-item>
        <el-form-item
          label="冒烟测试"
          prop="smokeTest"
          class="switch-test-item"
        >
          <el-switch v-model="ruleForm.smokeTest"></el-switch>
        </el-form-item>
        <el-form-item
          label="代码评审"
          prop="codeReview"
          class="switch-test-item"
        >
          <el-switch v-model="ruleForm.codeReview"></el-switch>
        </el-form-item>
      </div>
      <el-form-item label="Java文件" prop="javaFiles">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 10 }"
          v-model="ruleForm.javaFiles"
        ></el-input>
      </el-form-item>
      <el-form-item label="元数据文件" prop="metaFiles">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 10 }"
          v-model="ruleForm.metaFiles"
        ></el-input>
      </el-form-item>
      <el-form-item label="数据库脚本" prop="dbScript">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 10 }"
          v-model="ruleForm.dbScript"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 10 }"
          v-model="ruleForm.remark"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="ruleForm.id === ''"
          type="primary"
          @click="submitForm('ruleForm')"
          size="mini"
          >立即创建</el-button
        >
        <el-button
          v-else
          type="primary"
          @click="modifyForm('ruleForm')"
          size="mini"
          >确认修改</el-button
        >
        <el-button @click="resetForm('ruleForm')" size="mini">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    title: String,
    creators: Array
  },
  data() {
    return {
      submitTargets: [
        { value: '分支到主干', label: '分支到主干' },
        { value: '主干到基线', label: '主干到基线' }
      ],
      toTrank: true,
      toBaseline: true,
      ruleForm: {
        id: '',
        sonar: false,
        unitTest: false,
        codeReview: false,
        smokeTest: false,
        bugNo: '-',
        creator: '',
        submitTarget: '分支到主干',
        requireDesc: '-',
        codeModifyDesc:
          '【修改原因】填写BUG号或需求说明\r\n' +
          '【修改内容】\r\n' +
          '【修改人】' +
          '\r\n' +
          '【检查人】',
        scope: '',
        javaFiles: '',
        metaFiles: '',
        dbScript: '',
        remark: ''
      },
      rules: {
        creator: [
          { required: true, message: '请选择申请人', trigger: 'change' }
        ],
        submitTarget: [
          { required: true, message: '请选择提交目标', trigger: 'change' }
        ],
        codeModifyDesc: [
          { required: true, message: '请填写代码修改说明', trigger: 'blur' }
        ],
        scope: [{ required: true, message: '请填写影响范围', trigger: 'blur' }]
      }
    }
  },
  watch: {
    'ruleForm.creator': {
      handler: function(newName, oldName) {
        if (typeof newName === 'string' && newName !== '') {
          var desc = this.ruleForm.codeModifyDesc
          var strArr = desc.split('【修改人】')
          // var preStr = strArr[0] +
          this.ruleForm.codeModifyDesc =
            strArr[0] + '【修改人】' + newName + '\r\n' + '【检查人】' + newName
        }
      },
      immediate: true
    }
  },
  mounted: function() {
    if (this.rowjsonbak instanceof Array && this.rowjsonbak.length > 0) {
      this.ruleForm = this.rowjsonbak
    }
  },
  methods: {
    initEditRuleForm: function(ruleForm) {
      this.ruleForm = ruleForm
    },
    submitForm: function(formName) {
      var _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$cat
            .post('/tw-csl/code-submit-list', _this.ruleForm)
            .then(function(response) {
              if (response.status === 200) {
                _this.resetForm('ruleForm')
                _this.$emit('refresh')
                _this.dialogFormVisible = false
                console.log(response)
              } else {
                _this.$message.error('网络异常！')
              }
            })
            .catch(function(error) {
              _this.$message.error('服务器发生异常！')
              _this.dialogFormVisible = false
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    modifyForm: function(formName) {
      var _this = this
      this.$refs[formName].validate(function(valid) {
        if (valid) {
          this.$cat
            .put('/tw-csl/code-submit-list', _this.ruleForm)
            .then(function(response) {
              if (response.status === 200) {
                _this.resetForm('ruleForm')
                _this.$emit('refresh')
                _this.dialogFormVisible = false
                console.log(response)
              } else {
                _this.$message.error('网络异常！')
              }
            })
            .catch(function(error) {
              _this.$message.error('服务器发生异常！')
              _this.dialogFormVisible = false
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm: function(formName) {
      this.$refs[formName].resetFields()
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
.fl-container {
  width: 100%;
  .switch-test-group {
    .switch-test-item {
      display: inline-block;
      width: 20%;
    }
  }
}
</style>
