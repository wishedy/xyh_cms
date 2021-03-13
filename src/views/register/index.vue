<template>
  <div class="register-container">

    <el-form  :model="registerForm" :rules='registerRules' ref="registerForm" label-width="100px" class="register-form demo-ruleForm"  >
      <div class="title-container">
        <h3 class="title">学研汇管理员注册</h3>
      </div>
      <el-form-item label="姓名" prop="realName">
        <el-input type="name" v-model="registerForm.realName" auto-complete="off" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="E-mail" prop="email">
        <el-input v-model="registerForm.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNum">
        <el-input v-model="registerForm.phoneNum" auto-complete="off" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idNum">
        <el-input v-model="registerForm.idNum" auto-complete="off" placeholder="请输入身份证号"></el-input>
      </el-form-item>
      <el-form-item label="管理级别" prop="role">
        <el-select v-model="registerForm.role" clearable placeholder="请选择" style="width:256px;"  auto-complete="off">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="registerForm.gender">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="密码"  prop="password">
        <el-input type="password" v-model="registerForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item class="submit-item">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { testPhoneNum, testEmail, testID, testName, testPassword } from '@/utils'
import { handleRegister } from '@/resource'
import md5 from 'blueimp-md5'
export default {
  name: 'register',
  methods: {
    handleSubmit () {
      const _this = this
      _this.$refs.registerForm.validate(async (valid) => {
        if (valid) {
          _this.registerForm.password = md5(_this.registerForm.password)
          const res = await handleRegister(_this.registerForm)
          console.log(res)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleReset () {
      const _this = this
      _this.registerForm = JSON.parse(JSON.stringify(_this.originalForm))
    }
  },
  data () {
    const validateName = (rule, value, callBack) => {
      if (value === '') {
        callBack(new Error('请输入名字'))
      } else {
        console.log(this.registerForm.realName, value, testName(value))
        if (!testName(value)) {
          callBack(new Error('请输入正确的名字'))
        } else {
          this.$refs.registerForm.validateField('email')
          callBack()
        }
      }
    }
    const validateEmail = (rule, value, callBack) => {
      if (value === '') {
        callBack(new Error('请输入邮件'))
      } else {
        if (testEmail(value)) {
          this.$refs.registerForm.validateField('phoneNum')
        } else {
          callBack(new Error('请输入正确的邮件'))
        }
        callBack()
      }
    }
    const validateidNum = (rule, value, callBack) => {
      if (value === '') {
        callBack(new Error('请输入身份号'))
      } else {
        if (testID(value)) {
          this.$refs.registerForm.validateField('role')
        } else {
          callBack(new Error('请输入正确的身份号'))
        }
        callBack()
      }
    }
    const validateGrade = (rule, value, callBack) => {
      if (value === '') {
        callBack(new Error('请选择管理员级别'))
      } else {
        callBack()
      }
    }
    const validatePhoneNum = (rule, value, callBack) => {
      if (value === '') {
        callBack(new Error('请输入手机号'))
      } else {
        if (testPhoneNum(value)) {
          callBack()
        } else {
          callBack(new Error('请输入正确的手机号'))
        }
        callBack()
      }
    }
    const validatePassWord = (rule, value, callBack) => {
      if (value === '') {
        callBack(new Error('请输入密码'))
      } else {
        if (testPassword(value)) {
          callBack()
        } else {
          callBack(new Error('密码中必须包含字母（不区分大小写）、数字，至少8个字符，最多30个字符'))
        }
        callBack()
      }
    }
    return {
      options: [{
        value: '0',
        label: '超级管理员'
      }, {
        value: '1',
        label: '普通管理员'
      }],
      registerRules: {
        realName: [
          {
            required: true,
            message: '管理员名称不能为空',
            trigger: 'blur'
          },
          {
            validator: validateName, trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '邮箱地址不能为空',
            trigger: 'blur'
          },
          {
            validator: validateEmail, trigger: 'blur'
          }
        ],
        phoneNum: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          },
          {
            validator: validatePhoneNum, trigger: 'blur'
          }
        ],
        gender: [
          {
            required: true,
            message: '性别不能为空',
            trigger: 'blur'
          }
        ],
        idNum: [
          {
            required: true,
            message: '身份证号不能为空',
            trigger: 'blur'
          },
          {
            validator: validateidNum, trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          },
          {
            validator: validatePassWord, trigger: 'blur'
          }
        ],
        role: [
          {
            required: true,
            message: '管理员级别不能为空',
            trigger: 'blur'
          },
          {
            validator: validateGrade, trigger: 'change'
          }
        ]
      },
      registerForm: {
        realName: '',
        email: '',
        phoneNum: '',
        idNum: '',
        role: '',
        password: '',
        gender: '1'
      },
      originalForm: {
        realName: '',
        email: '',
        phoneNum: '',
        idNum: '',
        role: '',
        password: '',
        gender: '1'
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .submit-item{
    border:none;
    background: none;
  }
}
.el-form-item--medium .el-form-item__label{
  line-height: 47px;
}
.el-form-item--medium .el-form-item__content{
  line-height: 47px;
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .register-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 80px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
