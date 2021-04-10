<template>
  <section class="el-main">
    <SearchPanel
      @handleSearch="getList"
      :demandList="demandList"
    />
    <HandleBar @handleCreate="createData"/>
    <TablePanel
      @handleEdit="editData"
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
      :demandList="demandList"
      :editItemData="editItemData"
      @handleCancel="closeEditPanel"
      :editType="editType"/>
  </section>
</template>
<script>
import HandleBar from '@/views/resource/demand/components/HandleBar'
import { createClassType, updateClassType, getClassTypeList } from '@/resource'
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
      demandList: [
        {
          id: 1,
          names: '专栏'
        },
        {
          id: 2,
          names: '标签'
        },
        {
          id: 3,
          names: '分类'
        }
      ],
      submitForm: {},
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
  },
  methods: {
    updateStatus (data) {
      const _this = this
      const warn = parseInt(data.status, 10) === 1 ? '下架该类别' : '上架该类别'
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
          await updateClassType(form)
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
      console.log(_this.submitForm)
      const res = await createClassType(_this.submitForm)
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
          const res = await updateClassType(_this.submitForm)
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
      _this.submitForm = {}
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
    async getList (form) {
      const _this = this
      const res = await getClassTypeList({
        pageSize: _this.pageSize,
        pageNum: _this.pageNum,
        ...form
      })
      _this.total = res.result.total
      _this.list = res.result.list
      console.log(res)
      console.log(form)
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
