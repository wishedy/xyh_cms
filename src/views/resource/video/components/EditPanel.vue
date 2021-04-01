<template>
  <BaseDrawer
    :visible="visible"
    :show-footer="true"
    :title="editTypeTitle"
    width="650px"
    @confirm="handleConfirm"
    @cancel="$emit('handleCancel')"
    @close="$emit('handleCancel')"
  >
    <el-form :model="ruleForm" status-icon :rules="rules" ref="editForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="视频名" prop="names">
        <el-input  v-model="ruleForm.names" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input  v-model="ruleForm.author" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="需求类型" prop="needId">
        <el-select v-model="ruleForm.needId" clearable placeholder="请选择" style="width:256px;"  auto-complete="off">
          <el-option
            v-for="item in demandList"
            :key="item.id"
            :label="item.names"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="视频简介" prop="introduce">
        <el-input  v-model="ruleForm.introduce" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="视频内容" prop="author">
        <el-upload
          class="avatar-uploader"
          action="/api/upload/uploadImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <div class="avatar-delete-mask" v-if="ruleForm.urls">
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
    editTypeTitle () {
      const _this = this
      return parseInt(_this.editType, 10) === 1 ? '编辑需求类型' : '新建需求类型'
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
        names: '',
        needId: '',
        urls: '',
        introduce: '',
        author: '',
        contents: ''
      },
      originalForm: {
        id: '',
        urls: '',
        names: '',
        needId: '',
        introduce: '',
        author: '',
        contents: ''
      },
      rules: {
        names: [
          { required: true, message: '请输入视频名称', trigger: 'blur' }
        ],
        contents: [
          { required: true, message: '请输入视频内容', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入视频作者名称', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请输入视频简介', trigger: 'blur' }
        ],
        needId: [
          { required: true, message: '请选择需求类型', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    deleteVideo () {
      const _this = this
      _this.ruleForm.urls = ''
    },
    handleAvatarSuccess (res, file) {
      const _this = this
      if (res && parseInt(res.code, 10) === 200) {
        _this.ruleForm.urls = res.result.url
      }
    },
    beforeAvatarUpload (file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'].indexOf(file.type) === -1) {
        this.$message.error('请上传正确的视频格式')
        return false
      }
      if (!isLt10M) {
        this.$message.error('上传视频大小不能超过10MB哦!')
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
