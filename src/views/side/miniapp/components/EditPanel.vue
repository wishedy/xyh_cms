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
      <el-form-item label="入口名" prop="title">
        <el-input  v-model="ruleForm.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="跳转连接" prop="url">
        <el-input  v-model="ruleForm.url" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="入口描述" prop="url">
        <el-input  v-model="ruleForm.describes" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="入口背景" prop="url">
        <el-upload
          class="avatar-uploader"
          action="/api/upload/uploadImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <div class="avatar-delete-mask" v-if="ruleForm.imgUrl">
            <section class="avatar-delete-content" :style="{background:'url('+ruleForm.imgUrl+') no-repeat center/contain'}"></section>
            <section class="avatar-delete-handle">
              <span class="handle-item el-icon-delete-solid" @click="deleteVideo">删除</span>
              <span class="handle-item el-icon-success">上传成功</span>
            </section>
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
      return parseInt(_this.editType, 10) === 1 ? '编辑入口' : '新建入口'
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
        title: '',
        imgUrl: '',
        describes: '',
        url: ''
      },
      originalForm: {
        id: '',
        imgUrl: '',
        describes: '',
        title: '',
        url: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入入口名称', trigger: 'blur' }
        ],
        showType: [
          { required: true, message: '请选择入口展示页面', trigger: 'blur' }
        ],
        contents: [
          { required: true, message: '请输入入口内容', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入入口作者名称', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请输入入口简介', trigger: 'blur' }
        ],
        needId: [
          { required: true, message: '请选择入口', trigger: 'blur' }
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
        this.$message.error('请上传正确的入口格式')
        return false
      }
      if (!isLt10M) {
        this.$message.error('上传入口大小不能超过10MB哦!')
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
