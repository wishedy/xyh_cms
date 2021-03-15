<template>
  <section class="el-main">
    <SearchPanel @handleSearch="getList"/>
    <TablePanel
      @handleEdit="editData"
      :pageSize="pageSize"
      :pageNum="pageNum"
      :total="total"
      :list="list"
      @handleAuditAdmin="handleAuditAdmin"
      @handleResetPassword="handleResetPassword"
      @handleSizeChange="handleSizeChange"
      @handlePageChange="handlePageChange"/>
    <EditPanel :visible.sync="visible" @handleCancel="closeEditPanel" />
  </section>
</template>
<script>
import { getAdminList, handleAdmin, passwordReset } from '@/resource'
import EditPanel from './components/EditPanel'
import SearchPanel from './components/SearchPanel'
import TablePanel from './components/TablePanel'
export default {
  name: 'Administrator',
  components: {
    SearchPanel,
    TablePanel,
    EditPanel
  },
  data () {
    return {
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
    handleAuditAdmin (options) {
      const _this = this
      console.log(options)
      const statusText = `${parseInt(options.states, 10) === 1 ? '通过' : parseInt(options.states, 10) === 2 ? '拒绝' : '注销'}`
      _this.$confirm('确定' + statusText + '该管理员审核?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        try {
          const res = await handleAdmin(options)
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
    handleResetPassword (options) {
      const _this = this
      console.log(options)
      const statusText = '重置'
      _this.$confirm('确定' + statusText + '该管理员密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        try {
          const res = await passwordReset(options)
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
      const res = await getAdminList({
        pageSize: _this.pageSize,
        pageNum: _this.pageNum,
        ...form
      })
      _this.total = res.result.total
      _this.list = res.result.list
      console.log(res)
      console.log(form)
    },
    createItem () {
      this.openEditPanel()
    },
    openEditPanel () {
      this.visible = true
    },
    closeEditPanel () {
      console.log('触发')
      this.visible = false
    },
    editData () {
      this.openEditPanel()
    }
  }
}
</script>
