<template>
  <section class="el-main">
    <SearchPanel
      @handleSearch="getList"
    />
    <HandleBar @handleCreate="createData"/>
    <TablePanel
      @handleEdit="editData"
      @handleUploadResultFile="handleResultFileSuccess"
      @handleUploadNeedFile="handleNeedFileSuccess"
      :pageSize="pageSize"
      :pageNum="pageNum"
      :total="total"
      :list="list"
      @handleSizeChange="handleSizeChange"
      @handlePageChange="handlePageChange"
    />
    <EditPanel
      :visible.sync="visible"
      @submit="handleSubmit"
      :editItemData="editItemData"
      @handleCancel="closeEditPanel"
      :editType="editType" />
  </section>
</template>
<script>
import { createOrders, getUserOrderList, updateOrder } from '@/resource'
import EditPanel from './components/EditPanel'
import SearchPanel from './components/SearchPanel'
import TablePanel from './components/TablePanel'
import HandleBar from '@/views/member/memberOrder/components/HandleBar'
export default {
  name: 'Administrator',
  components: {
    HandleBar,
    SearchPanel,
    TablePanel,
    EditPanel
  },
  data () {
    return {
      submitForm: {},
      editItemData: {},
      editType: 0,
      list: [],
      pageSize: 20,
      pageNum: 1,
      total: 0,
      visible: false
    }
  },
  mounted () {
    const _this = this
    _this.getList()
  },
  methods: {
    async getList (form) {
      const _this = this
      const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
      const res = await getUserOrderList({
        pageSize: _this.pageSize,
        pageNum: _this.pageNum,
        ...form,
        status: '1',
        createUser: parseInt(user.role, 10) === 0 ? '' : user.id
      })
      _this.total = res && res.result && res.result.total ? res.result.total : 0
      _this.list = res && res.result && res.result.list ? res.result.list : []
    },
    handleSubmit (form) {
      const _this = this
      _this.submitForm = form
      if (parseInt(_this.editType, 10) === 0) {
        // 无id新增
        try {
          _this.handleAddRequest()
        } catch (e) {
          _this.$message.error(e.msg)
        }
      } else {
        _this.handleEditConfirm()
      }
    },
    async handleAddRequest () {
      const _this = this
      const res = await createOrders(_this.submitForm)
      if (res) {
        this.$message.success('保存成功')
      }
      _this.handleAfterRequest()
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
    createItem () {
      this.openEditPanel()
    },
    createData () {
      this.editType = 0
      this.editItemData = {}
      this.openEditPanel()
    },
    async handleEditConfirm () {
      const _this = this
      try {
        await updateOrder(_this.submitForm)
        _this.$message({
          message: '操作已完成',
          type: 'success'
        })
        _this.handleAfterRequest()
      } catch (e) {
        _this.$message.error(e.msg)
      }
    },
    handleAfterRequest () {
      const _this = this
      _this.submitForm = {}
      _this.closeEditPanel()
      _this.getList()
    },
    openEditPanel () {
      this.visible = true
    },
    handleResultFileSuccess (data) {
      this.submitForm = data
      this.handleEditConfirm()
    },
    handleNeedFileSuccess (data) {
      this.submitForm = data
      this.handleEditConfirm()
    },
    closeEditPanel () {
      this.visible = false
    },
    editData (data) {
      this.editType = 1
      this.submitForm = data
      this.handleEditConfirm()
    }
  }
}
</script>
