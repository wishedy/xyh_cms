<template>
  <section class="el-main">
    <quill-editor
      v-model="contents"
      ref="myQuillEditor"
      class="el-main-editor editor"
      :options="editorOption"
      @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
      @change="onEditorChange($event)">
    </quill-editor>
    <el-button-group class="handle-submit">
      <el-button type="primary" @click.native="handleSubmit">提交</el-button>
    </el-button-group>
  </section>
</template>
<script>
import { updateAbout, getAboutList } from '@/resource'
export default {
  name: 'Administrator',
  data () {
    return {
      editorOption: {
        placeholder: '请输入文本内容',
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
      contents: '',
      demandList: [],
      editItemData: {},
      editType: 1,
      visible: false,
      pageSize: 10,
      total: 0,
      pageNum: 1,
      contentType: {
        About: 0,
        Zoology: 1,
        Client: 2
      },
      list: []
    }
  },
  mounted () {
    const _this = this
    console.log('在这里')
    console.log(_this.$route.name)
    _this.getList()
  },
  methods: {
    onEditorReady (editor) { // 准备编辑器

    },
    onEditorBlur () {}, // 失去焦点事件
    onEditorFocus () {}, // 获得焦点事件
    onEditorChange () {}, // 内容改变事件
    handleSubmit () {
      const _this = this
      _this.handleEditConfirm()
    },
    handleEditConfirm () {
      const _this = this
      _this.$confirm('是否保存当前修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        try {
          const form = {
            id: _this.contentType[_this.$route.name],
            introduce: _this.contents
          }
          const res = await updateAbout(form)
          console.log(res)
          _this.$message({
            message: '操作已完成',
            type: 'success'
          })
          _this.handleAfterRequest()
        } catch (e) {
          _this.$message.error(e.msg)
        }
      }).catch(() => {})
    },
    handleAfterRequest () {
      const _this = this
      _this.closeEditPanel()
      _this.getList()
    },
    handleSizeChange (size) {
      const _this = this
      _this.pageSize = size
      _this.getList()
    },
    handlePageChange (page) {
      const _this = this
      _this.pageNum = page
      _this.getList()
    },
    async getList () {
      const _this = this
      const res = await getAboutList({ type: _this.contentType[_this.$route.name] })
      _this.contents = res.result ? '' : res.result
    },
    openEditPanel () {
      this.visible = true
    },
    closeEditPanel () {
      console.log('触发')
      this.visible = false
    },
    createData () {
      this.editType = 0
      this.editItemData = {}
      this.openEditPanel()
    },
    editData (form) {
      this.editType = 1
      this.editItemData = form
      this.openEditPanel()
    }
  }
}
</script>
