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
      <el-form-item label="课程名" prop="title">
        <el-input  v-model="ruleForm.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="资源类型" prop="resType">
        <el-radio-group v-model="ruleForm.resType">
          <el-radio label="2">视频</el-radio>
          <el-radio label="1">文章</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文章跳转链接" prop="articleUrl" v-if="parseInt(ruleForm.resType,10)===1">
        <el-input  v-model="ruleForm.articleUrl" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="视频链接" prop="videoUrl" v-if="parseInt(ruleForm.resType,10)===2">
        <el-input  v-model="ruleForm.videoUrl" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="收费类型" prop="chargeType">
        <el-radio-group v-model="ruleForm.chargeType">
          <el-radio label="1">全员免费</el-radio>
          <el-radio label="2">会员免费</el-radio>
          <el-radio label="3">收费</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="课程标签" prop="labelList" v-if="label&&label.length">
        <el-checkbox-group v-model="ruleForm.labelList">
          <el-checkbox :label="item.id" name="labelList" v-for="(item) in label" :key="item.id">{{item.names}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="课程专栏" prop="columnList" v-if="column&&column.length">
        <el-checkbox-group v-model="ruleForm.columnList">
          <el-checkbox :label="item.id" name="columnList" v-for="(item) in column" :key="item.id">{{item.names}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="课程分类" prop="itemizeList" v-if="itemize&&itemize.length">
        <el-checkbox-group v-model="ruleForm.itemizeList">
          <el-checkbox :label="item.id" name="itemizeList" v-for="(item) in itemize" :key="item.id">{{item.names}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="类别排序" prop="orderBy">
        <el-input-number v-model="ruleForm.orderBy" :min="1" label="请输入排序"></el-input-number>
      </el-form-item>
    <el-form-item label="描述简介" prop="introduce">
      <el-input  v-model="ruleForm.introduce" autocomplete="off"></el-input>
    </el-form-item>
      <el-form-item label="资源ID" prop="title">
        <el-input  v-model="ruleForm.resId" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="资源价格" prop="price">
        <el-input  v-model="ruleForm.price" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="课程封面" prop="imgUrl">
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
    itemize: {
      default () {
        return []
      },
      type: Array
    },
    label: {
      default () {
        return []
      },
      type: Array
    },
    column: {
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
    const checkArticleUrl = (rule, value, callback) => {
      const val = this.ruleForm.articleUrl
      if (isURL(val)) {
        return callback()
      } else {
        return callback(new Error('请输入正确的连接地址'))
      }
    }
    const checkVideoUrl = (rule, value, callback) => {
      const val = this.ruleForm.videoUrl
      if (isURL(val)) {
        return callback()
      } else {
        return callback(new Error('请输入正确的连接地址'))
      }
    }
    return {
      imageLoading: false,
      ruleForm: {
        id: '',
        orderBy: '',
        price: '',
        chargeType: '',
        imgUrl: '',
        articleUrl: '',
        videoUrl: '',
        resId: '',
        introduce: '',
        labelList: [],
        columnList: [],
        itemizeList: [],
        title: '',
        resType: ''
      },
      originalForm: {
        id: '',
        resType: '',
        price: '',
        imgUrl: '',
        introduce: '',
        articleUrl: '',
        videoUrl: '',
        chargeType: '',
        resId: '',
        orderBy: '',
        labelList: [],
        columnList: [],
        itemizeList: [],
        title: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请输入课程简介', trigger: 'blur' }
        ],
        labelList: [
          { required: true, message: '请选择课程标签', trigger: 'blur' }
        ],
        columnList: [
          { required: true, message: '请选择课程专栏', trigger: 'blur' }
        ],
        itemizeList: [
          { required: true, message: '请选择课程分类', trigger: 'blur' }
        ],
        videoUrl: [
          { message: '请输入正确的跳转连接', validator: checkVideoUrl, trigger: 'blur' },
          { required: true, message: '请输入视频链接', trigger: 'blur' }
        ],
        articleUrl: [
          { message: '请输入正确的跳转连接', validator: checkArticleUrl, trigger: 'blur' },
          { required: true, message: '请输入文章链接', trigger: 'blur' }
        ],
        imgUrl: [
          { required: true, message: '请上传课程封面', trigger: 'blur' }
        ],
        resType: [
          { required: true, message: '请选择课程类别维度', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入课程价格', trigger: 'blur' }
        ],
        chargeType: [
          { required: true, message: '请选择付费类型', trigger: 'blur' }
        ],
        orderBy: [
          { required: true, message: '请输入课程类别排序', trigger: 'blur' }
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
          console.log({ type: 1, id: _this.ruleForm.resId, resType: _this.ruleForm.resType })
          checkResource({ type: 1, id: _this.ruleForm.resId, resType: _this.ruleForm.resType }).then((res) => {
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
