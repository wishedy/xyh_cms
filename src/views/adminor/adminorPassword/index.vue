<template>
  <section class="el-main">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="旧密码" prop="oldPass">
        <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input type="password" v-model="ruleForm.newPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPass">
        <el-input type="password" v-model="ruleForm.confirmPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="submit-btn">
        <el-button type="primary" @click="submitForm()">确认</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
import md5 from 'blueimp-md5'
import { updatePass } from '@/resource'
export default {
  name: 'Administrator',
  data () {
    return {
      ruleForm: {
        oldPass: '',
        oldPassword: '',
        newPass: '',
        newPassword: '',
        confirmPass: ''
      },
      rules: {
        oldPass: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        confirmPass: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ],
        newPass: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      const _this = this
      _this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          if (_this.ruleForm.newPass !== _this.ruleForm.confirmPass) {
            _this.$message.error('密码不一致')
          } else {
            _this.ruleForm.oldPassword = md5(_this.ruleForm.oldPass)
            _this.ruleForm.newPassword = md5(_this.ruleForm.newPass)
            try {
              await updatePass(_this.ruleForm)
              _this.$message({
                message: '操作已完成',
                type: 'success'
              })
            } catch (e) {
              _this.$message.error(e.msg)
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-main{
  margin: 140px auto;
  width: 700px;
}
.submit-btn{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ::v-deep .el-button{
    width: 380px;
    height: 32px;
    box-sizing: unset;
    border-radius: 40px;
    background: #1E7BFE;
    line-height: 56px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}
</style>
