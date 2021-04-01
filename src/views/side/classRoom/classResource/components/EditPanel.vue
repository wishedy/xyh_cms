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
      <el-form-item label="课程名" prop="names">
        <el-input  v-model="ruleForm.names" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="文章跳转链接" prop="names">
        <el-input  v-model="ruleForm.names" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="视频链接" prop="names">
        <el-input  v-model="ruleForm.names" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="类别排序" prop="orderBy">
        <el-input-number v-model="ruleForm.orderBy" :min="1" label="请输入排序"></el-input-number>
      </el-form-item>
    <el-form-item label="描述简介" prop="names">
      <el-input  v-model="ruleForm.names" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="资源类型" prop="types">
        <el-radio-group v-model="ruleForm.types">
          <el-radio label="1">专栏</el-radio>
          <el-radio label="2">标签</el-radio>
          <el-radio label="3">分类</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="类别排序" prop="orderBy">
        <el-input-number v-model="ruleForm.orderBy" :min="1" label="请输入排序"></el-input-number>
      </el-form-item>
      <el-form-item label="资源ID" prop="names">
        <el-input  v-model="ruleForm.names" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="课程封面" prop="url">
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
