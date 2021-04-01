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
      <el-form-item label="优势标题" prop="title">
        <el-input  v-model="ruleForm.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="优势跳转链接" prop="url">
        <el-input  v-model="ruleForm.url" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="优势描述" prop="describes">
        <el-input  v-model="ruleForm.describes" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="优势封面" prop="imgUrl">
        <el-upload
          class="avatar-uploader"
          action="/api/upload/uploadImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <div class="avatar-delete-mask" v-if="ruleForm.imgUrl">
            <span class="handle-item el-icon-delete-solid" @click="deleteVideo">删除</span>
            <span class="handle-item el-icon-success">上传成功</span>
          </div>
          <!--          <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      return parseInt(_this.editType, 10) === 1 ? '编辑优势' : '新建优势'
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
        url: '',
        proTypeId: '',
        describes: '',
        resId: '',
        title: '',
        imgUrl: '',
        resType: ''
      },
      originalForm: {
        id: '',
        resType: '',
        proTypeId: '',
        imgUrl: '',
        url: '',
        describes: '',
        resId: '',
        title: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入优势标题', trigger: 'blur' }
        ],
        describes: [
          { required: true, message: '请输入优势描述', trigger: 'blur' }
        ],
        resType: [
          { required: true, message: '请选择资源类型', trigger: 'blur' }
        ],
        imgUrl: [
          { required: true, message: '请上传优势封面图', trigger: 'blur' }
        ],
        proTypeId: [
          { required: true, message: '请选择优势类型', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入优势跳转连接', trigger: 'blur' }
        ],
        types: [
          { required: true, message: '请选择课程类别维度', trigger: 'blur' }
        ],
        resId: [
          { required: true, message: '请输入资源ID', trigger: 'blur' }
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
