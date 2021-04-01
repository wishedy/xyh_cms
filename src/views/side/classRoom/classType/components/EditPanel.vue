<template>
  <BaseDrawer
    :visible="visible"
    :show-footer="true"
    :names="editTypeNames"
    width="650px"
    @confirm="handleConfirm"
    @cancel="$emit('handleCancel')"
    @close="$emit('handleCancel')"
  >
    <el-form :model="ruleForm" status-icon :rules="rules" ref="editForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="课程类别名" prop="names">
        <el-input  v-model="ruleForm.names" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="课程类别类型" prop="types">
        <el-radio-group v-model="ruleForm.types">
          <el-radio label="1">专栏</el-radio>
          <el-radio label="2">标签</el-radio>
          <el-radio label="3">分类</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="类别排序" prop="orderBy">
        <el-input-number v-model="ruleForm.orderBy" :min="1" label="请输入排序"></el-input-number>
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
    editTypeNames () {
      const _this = this
      return parseInt(_this.editType, 10) === 1 ? '编辑课程类别' : '新建课程类别'
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
      imageUrl: '11111',
      ruleForm: {
        id: '',
        orderBy: '',
        names: '',
        types: ''
      },
      originalForm: {
        id: '',
        types: '',
        orderBy: '',
        names: ''
      },
      rules: {
        names: [
          { required: true, message: '请输入课程类别名称', trigger: 'blur' }
        ],
        types: [
          { required: true, message: '请选择课程类别维度', trigger: 'blur' }
        ],
        orderBy: [
          { required: true, message: '请输入课程类别排序', trigger: 'blur' }
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
