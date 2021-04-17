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
      <el-form-item label="文章名" prop="names">
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
      <el-form-item label="文章简介" prop="introduce">
        <el-input  v-model="ruleForm.introduce" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" prop="author">
        <quill-editor
          v-model="ruleForm.contents"
          ref="myQuillEditor"
          class="editor"
          :options="editorOption"
          @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
          @change="onEditorChange($event)">
        </quill-editor>
      </el-form-item>
    </el-form>
  </BaseDrawer>
</template>
<script>
import { quillRedefine } from 'vue-quill-editor-upload'
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
    editor () {
      return this.$refs.myQuillEditor.quill
    },
    editTypeTitle () {
      const _this = this
      return parseInt(_this.editType, 10) === 1 ? '编辑文章' : '新建文章'
    }
  },
  watch: {
    visible (show) {
      const _this = this
      _this.resetForm()
      if (show && _this.editItemData.id) {
        Object.keys(_this.ruleForm).forEach((key) => {
          console.log(key)
          _this.ruleForm[key] = _this.editItemData[key]
        })
      }
    }
  },
  created () {
    const _this = this
    _this.editorOption = quillRedefine(
      {
        // 图片上传的设置
        uploadConfig: {
          action: '/api/upload/uploadImg', // 必填参数 图片上传地址
          // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
          // 你必须把返回的数据中所包含的图片地址 return 回去
          res: (response) => {
            const path = response.result.url// 这里return你的图片地址即可
            return path
          },
          name: 'file' // 图片上传参数名
        },
        placeholder: '请输入文章内容',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'], // 引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: 'ordered' }, { list: 'bullet' }], // 列表
            [{ script: 'sub' }, { script: 'super' }], // 上下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            [{ direction: 'rtl' }], // 文本方向
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], // 字体
            [{ align: [] }], // 对齐方式
            ['clean'], // 清除字体样式
            ['image'] // 上传图片、上传视频
          ]
        }
      }
    )
  },
  data () {
    return {
      editorOption: {
        placeholder: '请输入文章内容',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'], // 引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: 'ordered' }, { list: 'bullet' }], // 列表
            [{ script: 'sub' }, { script: 'super' }], // 上下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            [{ direction: 'rtl' }], // 文本方向
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], // 字体
            [{ align: [] }], // 对齐方式
            ['clean'], // 清除字体样式
            ['image'] // 上传图片、上传视频
          ]
        }

      },
      ruleForm: {
        id: '',
        names: '',
        introduce: '',
        needId: '',
        author: '',
        contents: ''
      },
      originalForm: {
        id: '',
        names: '',
        introduce: '',
        needId: '',
        author: '',
        contents: ''
      },
      rules: {
        names: [
          { required: true, message: '请输入文章名称', trigger: 'blur' }
        ],
        contents: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入文章作者名称', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请输入文章简介', trigger: 'blur' }
        ],
        needId: [
          { required: true, message: '请选择需求类型', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onEditorReady (editor) { // 准备编辑器

    },
    onEditorBlur () {}, // 失去焦点事件
    onEditorFocus () {}, // 获得焦点事件
    onEditorChange () {}, // 内容改变事件
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
