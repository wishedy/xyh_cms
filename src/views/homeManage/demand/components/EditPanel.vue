<template>
  <BaseDrawer
    :visible="visible"
    :show-footer="true"
    :title="editTypeTitle"
    width="550px"
    @confirm="handleConfirm"
    @cancel="$emit('handleCancel')"
    @close="$emit('handleCancel')"
  >
    <el-form :model="ruleForm" status-icon :rules="rules" ref="editForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="产品类型名字" prop="names">
        <el-input  v-model="ruleForm.names" autocomplete="off"></el-input>
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
    editTypeTitle () {
      const _this = this
      return parseInt(_this.editType, 10) === 1 ? '编辑产品类型' : '新建产品类型'
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
    return {
      ruleForm: {
        id: '',
        names: ''
      },
      originalForm: {
        id: '',
        names: ''
      },
      rules: {
        names: [
          { required: true, message: '请输入产品类型名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
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
