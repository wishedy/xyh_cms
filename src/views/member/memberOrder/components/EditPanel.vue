<template>
  <BaseDrawer
    :visible="visible"
    :show-footer="true"
    :title="editTypetitle"
    width="650px"
    @confirm="handleConfirm"
    @cancel="$emit('handleCancel')"
    @close="$emit('handleCancel')"
  >
    <el-form :model="ruleForm" status-icon :rules="rules" ref="editForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="需求ID" prop="needId">
        <el-input  v-model="ruleForm.needId" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="交易价格" prop="amount">
        <el-input  v-model="ruleForm.amount" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
  </BaseDrawer>
</template>
<script>
import BaseDrawer from '@/components/Drawer/BaseDrawer'
export default {
  name: 'EditPanel',
  components: {
    BaseDrawer
  },
  props: {
    editType: {
      default () {
        return 0
      },
      type: Number
    },
    demandList: {
      default () {
        return []
      },
      type: Array
    },
    editItemData: {
      default () {
        return {}
      },
      type: Object
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    editTypetitle () {
      const _this = this
      return parseInt(_this.editType, 10) === 1 ? '编辑需求' : '新建需求'
    }
  },
  watch: {
    visible (show) {
      const _this = this
      _this.resetForm()
      if (show && _this.editItemData.id) {
        Object.keys(_this.ruleForm).forEach((key) => {
          _this.ruleForm[key] = _this.editItemData[key]
        })
      }
    }
  },
  data () {
    const checkCostMoney = (rule, value, callback) => {
      const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      const val = this.ruleForm.amount
      const numMaxOnOff = Number(val) < 99999.99
      if (reg.test(val) && numMaxOnOff) {
        return callback()
      } else {
        return callback(new Error('请输入正确的金额'))
      }
    }
    return {
      imageLoading: false,
      imageUrl: '11111',
      ruleForm: {
        id: '',
        amount: '',
        needId: ''
      },
      originalForm: {
        id: '',
        amount: '',
        needId: ''
      },
      rules: {
        needId: [
          { required: true, message: '请输入需求ID', trigger: 'blur' }
        ],
        amount: [
          { message: '请输入正确的金额', validator: checkCostMoney, trigger: 'blur' },
          { required: true, message: '请输入入账金额', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    deleteVideo () {
      const _this = this
      _this.ruleForm.imgUrl = ''
    },
    handleAvatarSuccess (res, file) {
      const _this = this
      if (res && parseInt(res.code, 10) === 200) {
        _this.ruleForm.imgUrl = res.result.url
        _this.imageLoading = false
      }
    },
    beforeAvatarUpload (file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].indexOf(file.type) === -1) {
        this.$message.error('请上传正确的二维码格式')
        return false
      }
      if (!isLt10M) {
        this.$message.error('上传二维码大小不能超过10MB哦!')
        return false
      }
      this.imageLoading = true
    },
    handleConfirm () {
      const _this = this
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          _this.$emit('submit', _this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm () {
      const _this = this
      _this.ruleForm = JSON.parse(JSON.stringify(_this.originalForm))
    }
  }
}
</script>
