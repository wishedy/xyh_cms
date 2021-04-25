<template>
  <section class="el-main">
    <SearchPanel
      @handleSearch="getList"
      :triggerReset="reset"
      :itemize="itemize"
    />
    <HandleBar @handleCreate="createData"/>
    <TablePanel
      @handleEdit="editData"
      @handleSearch="getList"
      @handleStatus="updateStatus"
      :pageSize="pageSize"
      :pageNum="pageNum"
      :total="total"
      :list="list"
      @handleSizeChange="handleSizeChange"
      @handlePageChange="handlePageChange"/>
    <EditPanel
      :visible.sync="visible"
      @submit="handleSubmit"
      :itemize="itemize"
      :label="label"
      :column="column"
      :editItemData="editItemData"
      @handleCancel="closeEditPanel"
      :editType="editType"/>
  </section>
</template>
<script>
import HandleBar from '@/views/side/classRoom/classResource/components/HandleBar'
import {
  getClassTypeList,
  createClassResource,
  updateClassResource,
  getClassResourceList
} from '@/resource'
import EditPanel from './components/EditPanel'
import SearchPanel from './components/SearchPanel'
import TablePanel from './components/TablePanel'
export default {
  name: 'Administrator',
  components: {
    SearchPanel,
    TablePanel,
    HandleBar,
    EditPanel
  },
  data () {
    return {
      reset: 0,
      itemize: [],
      label: [],
      column: [],
      submitForm: {},
      searchForm: {},
      editItemData: {},
      editType: 0,
      visible: false,
      pageSize: 10,
      total: 0,
      pageNum: 1,
      list: []
    }
  },
  mounted () {
    const _this = this
    _this.getList()
    _this.getTypeList()
  },
  methods: {
    updateStatus (data) {
      const _this = this
      const warn = parseInt(data.status, 10) === 1 ? '下架该课程资源' : '上架该课程资源'
      const form = {
        id: data.id,
        status: parseInt(data.status, 10) === 1 ? '0' : '1'
      }
      _this.$confirm(`请确认${warn}？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await updateClassResource(form)
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
    async getTypeList () {
      const _this = this
      const column = await getClassTypeList({ status: 1, types: 1 })
      const label = await getClassTypeList({ status: 1, types: 2 })
      const itemize = await getClassTypeList({ status: 1, types: 3 })
      _this.itemize = itemize.result
      _this.label = label.result
      _this.column = column.result
    },
    handleSubmit (form) {
      const _this = this
      _this.submitForm = form
      if (parseInt(_this.editType, 10) === 0) {
        // 无id新增
        _this.handleAddRequest()
      } else {
        _this.handleEditConfirm()
      }
    },
    async handleAddRequest () {
      const _this = this
      const res = await createClassResource(_this.submitForm)
      if (res) {
        this.$message.success('保存成功')
      }
      _this.handleAfterRequest()
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
          await updateClassResource(_this.submitForm)
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
      _this.submitForm = {}
      _this.closeEditPanel()
      _this.getList()
    },
    handleSizeChange (size) {
      const _this = this
      _this.pageSize = size
      _this.getList(_this.searchForm)
    },
    handlePageChange (page) {
      const _this = this
      _this.pageNum = page
      _this.getList(_this.searchForm)
    },
    unique (arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i].id === arr[j].id) { // 第一个等同于第二个，splice方法删除第二个
            arr[i].isTop = 1
            arr[j].isTop = 1
            arr.splice(j, 1)
            j--
          }
        }
      }
      return arr
    },
    async getList (form) {
      const _this = this
      _this.searchForm = form ? JSON.parse(JSON.stringify(form)) : {}
      if (Object.keys(_this.searchForm).length === 0) {
        _this.reset++
      }
      const res = await getClassResourceList({
        pageSize: _this.pageSize,
        pageNum: _this.pageNum,
        ..._this.searchForm
      })
      const haveTop = !!(res.result.topCourse && res.result.topCourse.id)
      if (haveTop) {
        res.result.topCourse.isTop = 1
      }
      _this.total = haveTop ? res.result.resultList.total + 1 : res.result.resultList.total
      _this.list = haveTop ? _this.unique([res.result.topCourse].concat(res.result.resultList.list)) : res.result.resultList.list
    },
    openEditPanel () {
      this.visible = true
    },
    closeEditPanel () {
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
