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
      <el-form-item label="产品标题" prop="title">
        <el-input  v-model="ruleForm.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="产品跳转链接" prop="url">
        <el-input  v-model="ruleForm.url" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="产品描述" prop="describes">
        <el-input  v-model="ruleForm.describes" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="资源类型" prop="resType">
        <el-radio-group v-model="ruleForm.resType">
          <el-radio label="1">视频</el-radio>
          <el-radio label="2">文章</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="资源ID" prop="resId">
        <el-input v-model="ruleForm.resId"   autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="产品类型" prop="proTypeId">
        <el-select v-model="ruleForm.proTypeId" clearable placeholder="请选择" style="width:256px;"  auto-complete="off">
          <el-option
            v-for="item in demandList"
            :key="item.id"
            :label="item.names"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封面" prop="imgUrl">
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
      return parseInt(_this.editType, 10) === 1 ? '编辑产品' : '新建产品'
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
      imageLoading: false,
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
          { required: true, message: '请输入产品标题', trigger: 'blur' }
        ],
        describes: [
          { required: true, message: '请输入产品描述', trigger: 'blur' }
        ],
        resType: [
          { required: true, message: '请选择资源类型', trigger: 'blur' }
        ],
        imgUrl: [
          { required: true, message: '请上传产品封面图', trigger: 'blur' }
        ],
        proTypeId: [
          { required: true, message: '请选择产品类型', trigger: 'blur' }
        ],
        url: [
          { message: '请输入正确的跳转连接', validator: checkUrl, trigger: 'blur' },
          { required: true, message: '请输入产品跳转连接', trigger: 'blur' }
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
          checkResource({ type: 0, id: _this.ruleForm.resId, resType: _this.ruleForm.resType }).then((res) => {
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
