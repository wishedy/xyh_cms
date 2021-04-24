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
      <el-form-item label="轮播图名" prop="title">
        <el-input  v-model="ruleForm.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="跳转链接" prop="url">
        <el-input  v-model="ruleForm.url" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="展示页面" prop="showType">
        <el-radio-group v-model="ruleForm.showType">
          <el-radio label="1">PC首页</el-radio>
          <el-radio label="10">小程序</el-radio>
          <el-radio label="20">学研课堂</el-radio>
          <el-radio label="30">课堂列表</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="轮播图背景" prop="url">
        <el-upload
          class="avatar-uploader"
          action="/api/upload/uploadImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <section class="avatar-loading-content" v-show="imageLoading"></section>
          <div class="avatar-delete-mask" v-if="ruleForm.imgUrl">
            <section class="avatar-delete-content" :style="{background:'url('+ruleForm.imgUrl+') no-repeat center/contain'}"></section>
            <section class="avatar-delete-handle">
              <span class="handle-item el-icon-delete-solid" @click="deleteVideo">删除</span>
              <span class="handle-item el-icon-success">上传成功</span>
            </section>
          </div>
<!--          <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
          <i v-else class="el-icon-plus avatar-uploader-icon" v-show="!imageLoading"></i>
        </el-upload>
      </el-form-item>
    </el-form>
  </BaseDrawer>
</template>
<script>
import { isURL } from '@/utils'
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
      return parseInt(_this.editType, 10) === 1 ? '编辑轮播图' : '新建轮播图'
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
      imageLoading: false,
      imageUrl: '',
      ruleForm: {
        id: '',
        title: '',
        showType: '',
        imgUrl: '',
        url: ''
      },
      originalForm: {
        id: '',
        imgUrl: '',
        showType: '',
        title: '',
        url: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入轮播图名称', trigger: 'blur' }
        ],
        showType: [
          { required: true, message: '请选择轮播图展示位置', trigger: 'blur' }
        ],
        url: [
          { message: '请输入正确的跳转链接', validator: checkUrl, trigger: 'blur' },
          { required: true, message: '请输入轮播图跳转链接', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请输入轮播图简介', trigger: 'blur' }
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
        this.$message.error('请上传正确的轮播图格式')
        return false
      }
      if (!isLt10M) {
        this.$message.error('上传轮播图大小不能超过10MB哦!')
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
