<template>
  <BaseDrawer
    :visible="visible"
    :show-footer="true"
    :names="editTypenames"
    width="650px"
    @confirm="handleConfirm"
    @cancel="$emit('handleCancel')"
    @close="$emit('handleCancel')"
  >
    <el-form :model="ruleForm" status-icon :rules="rules" ref="editForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="类型名" prop="names">
        <el-input  v-model="ruleForm.names" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="跳转链接" prop="url">
        <el-input  v-model="ruleForm.url" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="资源类型" prop="resType">
        <el-radio-group v-model="ruleForm.resType">
          <el-radio label="1">文章</el-radio>
          <el-radio label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="资源ID" prop="resId">
        <el-input v-model="ruleForm.resId"   autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
  </BaseDrawer>
</template>
<script>
import BaseDrawer from '@/components/Drawer/BaseDrawer'
import { checkResource, isURL } from '@/utils'
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
    editTypenames () {
      const _this = this
      return parseInt(_this.editType, 10) === 1 ? '编辑服务类型' : '新建服务类型'
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
    const checkUrl = (rule, value, callback) => {
      const val = this.ruleForm.url
      if (isURL(val)) {
        return callback()
      } else {
        return callback(new Error('请输入正确的连接地址'))
      }
    }
    return {
      imageUrl: '11111',
      ruleForm: {
        id: '',
        url: '',
        resId: '',
        names: '',
        resType: ''
      },
      originalForm: {
        id: '',
        resType: '',
        url: '',
        resId: '',
        names: ''
      },
      rules: {
        names: [
          { required: true, message: '请输入服务类型标题', trigger: 'blur' }
        ],
        resType: [
          { required: true, message: '请选择资源类型', trigger: 'blur' }
        ],
        url: [
          { message: '请输入正确的跳转链接', validator: checkUrl, trigger: 'blur' },
          { required: true, message: '请输入服务类型跳转链接', trigger: 'blur' }
        ],
        resId: [
          { required: true, message: '请输入资源ID', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleConfirm () {
      const _this = this
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          checkResource({ type: 2, id: _this.ruleForm.resId, resType: _this.ruleForm.resType }).then((res) => {
            _this.$emit('submit', _this.ruleForm)
          }).catch(() => {
            _this.$message.error('您所输入的资源不存在，请重新复制')
          })
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
